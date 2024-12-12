const mysql = require('mysql2');
const { Client } = require('ssh2');
require('dotenv').config();

const sshClient = new Client();

const sshConfig = {
  host: process.env.SSH_HOST,
  port: parseInt(process.env.SSH_PORT, 10),
  username: process.env.SSH_USER,
  password: process.env.SSH_PASSWORD,
};

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 50, // 合理的连接池大小
  connectTimeout: 10000,
};

let isSSHConnected = false; // 标记是否已建立SSH连接
let pool; // MySQL连接池实例

function connectToDatabase() {
  return new Promise((resolve, reject) => {
    if (isSSHConnected && pool) {
      console.log('复用已有的数据库连接池');
      return resolve(pool.promise());
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
            resolve(pool.promise());
          }
        );
      })
      .on('error', (err) => {
        console.error('SSH连接错误:', err);
        reject(err);
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

// 初始化连接
connectToDatabase().catch((err) => {
  console.error('初始化连接失败:', err);
  setTimeout(reconnectSSH, 5000);
});

module.exports = {
  get db() {
    if (!pool) {
      throw new Error('数据库连接未准备好');
    }
    return pool.promise();
  },
};
