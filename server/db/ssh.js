const mysql = require('mysql2/promise');
const { Client } = require('ssh2');
require('dotenv').config();

const sshClient = new Client();

const sshConfig = {
  host: process.env.SSH_HOST,
  port: parseInt(process.env.SSH_PORT, 10),
  username: process.env.SSH_USER,
  password: process.env.SSH_PASSWORD,
  keepaliveInterval: 30000, // 每30秒发送一次心跳包
  keepaliveCountMax: 3, // 如果连续3次没有收到响应，则断开连接
};

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 100,
  connectTimeout: 600000,
  timezone: 'Z',
};

let isSSHConnected = false; // 标记是否已建立SSH连接
let pool; // MySQL连接池实例

async function validateConnection() {
  try {
    const [rows] = await pool.query('SELECT 1');
    return rows.length > 0;
  } catch (err) {
    console.error('连接验证失败:', err);
    return false;
  }
}

async function recreateConnectionPool(stream) {
  if (pool) {
    console.log('销毁旧的连接池');
    await pool.end();
    pool = null;
  }

  pool = mysql.createPool({
    ...dbConfig,
    stream, // 使用新的 SSH 隧道流
  });

  console.log('新的连接池已创建');
  return pool;
}

async function getDbConnection() {
  if (!pool || !isSSHConnected) {
    console.log('连接池或SSH未初始化，重新建立连接...');
    await connectToDatabase();
  }

  const isValid = await validateConnection();
  if (!isValid) {
    console.log('数据库连接无效，重新建立连接...');
    await connectToDatabase();
  }

  return pool;
}

function connectToDatabase() {
  return new Promise((resolve, reject) => {
    if (isSSHConnected && pool) {
      console.log('复用已有的数据库连接池');
      return resolve(pool);
    }

    sshClient
      .on('ready', () => {
        console.log('SSH连接已建立');
        isSSHConnected = true;

        sshClient.forwardOut(
          '127.0.0.1',
          0,
          dbConfig.host,
          3306,
          async (err, stream) => {
            if (err) {
              console.error('端口错误:', err);
              isSSHConnected = false;
              return reject(err);
            }

            try {
              const newPool = await recreateConnectionPool(stream);
              console.log('通过SSH隧道建立MySQL连接');
              resolve(newPool);
            } catch (poolErr) {
              console.error('创建连接池失败:', poolErr);
              reject(poolErr);
            }
          }
        );
      })
      .on('error', (err) => {
        console.error('SSH连接错误:', err);
        reject(err);
      })
      .on('end', () => {
        console.log('SSH连接已关闭');
        sshClient.removeAllListeners();
        isSSHConnected = false;
      })
      .connect(sshConfig);
  });
}

function reconnectSSH() {
  console.log('尝试重新建立SSH连接...');
  connectToDatabase().catch((err) => {
    console.error('重新连接SSH失败:', err);
    setTimeout(reconnectSSH, 5000);
  });
}

setInterval(async () => {
  try {
    const connection = await getDbConnection();
    console.log('保持数据库连接活跃...');
    await connection.query('SELECT 1');
  } catch (err) {
    console.error('保持连接失败:', err);
  }
}, 300000);

connectToDatabase().catch((err) => {
  console.error('初始化连接失败:', err);
  setTimeout(reconnectSSH, 5000);
});

module.exports = {
  get db() {
    return getDbConnection();
  },
};