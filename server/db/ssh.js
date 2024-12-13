const mysql = require('mysql2/promise');
const { Client } = require('ssh2');
require('dotenv').config();

const sshClient = new Client();

const sshConfig = {
  host: process.env.SSH_HOST,
  port: parseInt(process.env.SSH_PORT, 10),
  username: process.env.SSH_USER,
  password: process.env.SSH_PASSWORD,
  // 配置SSH连接保持活跃
  keepaliveInterval: 30000,  // 每30秒发送一次心跳包
  keepaliveCountMax: 3,      // 如果连续3次没有收到响应，则断开连接
};

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 100, // 连接池大小
  connectTimeout: 600000, // 连接时限
  timezone: 'Z', // 配置时区，避免时区问题
};

let isSSHConnected = false; // 标记是否已建立SSH连接
let pool; // MySQL连接池实例

// 验证数据库连接是否有效
async function validateConnection() {
  try {
    const [rows] = await pool.query('SELECT 1');
    return rows.length > 0;
  } catch (err) {
    console.error('连接验证失败:', err);
    return false;
  }
}

// 获取数据库连接，若连接无效则重新连接
async function getDbConnection() {
  if (!pool) {
    throw new Error('数据库连接池未初始化');
  }

  const isValid = await validateConnection();
  if (!isValid) {
    console.log('连接失效，正在重连...');

    try {
      await connectToDatabase();
      console.log('数据库连接已恢复');
    } catch (err) {
      console.error('重连数据库失败:', err);
      throw new Error('数据库重连失败');
    }
  }

  return pool;
}

// 通过ssh通道连接数据库
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
          '127.0.0.1', // 本地IP地址
          0,           // 本地端口（自动选择）
          dbConfig.host, // 远程MySQL主机
          3306,         // 远程MySQL端口
          (err, stream) => {
            if (err) {
              console.error('端口错误:', err);
              isSSHConnected = false;
              return reject(err);
            }

            pool = mysql.createPool({
              ...dbConfig,
              stream, // 将隧道流传递给MySQL连接
            });

            console.log('通过SSH隧道建立MySQL连接');
            resolve(pool);
          }
        );
      })
      .on('error', (err) => {
        console.error('SSH连接错误:', err);
        reject(err);
      })
      .on('end', () => {
        console.log('SSH连接已关闭');
        // 移除所有事件监听器
        sshClient.removeAllListeners();  // 确保移除监听器，防止内存泄漏
      })
      .connect(sshConfig);
  });
}


// 尝试重连SSH
function reconnectSSH() {
  console.log('尝试重新建立SSH连接...');
  connectToDatabase().catch((err) => {
    console.error('重新连接SSH失败:', err);
    setTimeout(reconnectSSH, 5000); // 重试间隔
  });
}

// 定期保持数据库连接活跃
setInterval(async () => {
  try {
    const connection = await getDbConnection();
    console.log('保持数据库连接活跃...');
    await connection.query('SELECT 1');
  } catch (err) {
    console.error('保持连接失败:', err);
  }
}, 300000); // 每5分钟执行一次

// 初始化连接
connectToDatabase().catch((err) => {
  console.error('初始化连接失败:', err);
  setTimeout(reconnectSSH, 5000);
});

module.exports = {
  get db() {
    return getDbConnection();
  },
};
