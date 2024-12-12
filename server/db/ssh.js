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
  connectionLimit: 10, // 调整为合理值
  connectTimeout: 10000,
};

let dbPromise; // 连接池 Promise

function connectToDatabase() {
  return new Promise((resolve, reject) => {
    sshClient
      .on('ready', () => {
        console.log('SSH连接已建立');

        // 创建 SSH 隧道
        sshClient.forwardOut(
          '127.0.0.1', // 本地 IP 地址
          0,           // 本地端口（自动选择）
          dbConfig.host, // 远程 MySQL 主机
          3306,         // 远程 MySQL 端口
          (err, stream) => {
            if (err) {
              console.error('端口错误:', err);
              return reject(err);
            }

            // 使用 SSH 隧道建立 MySQL 连接
            const pool = mysql.createPool({
              ...dbConfig,
              stream, // 将隧道流传递给 MySQL 连接
            });

            dbPromise = pool.promise(); // 创建 Promise 化的连接池
            console.log('通过ssh隧道建立MySQL连接');
            resolve(dbPromise); // 连接成功后 resolve
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

// 导出 db 对象
module.exports = {
  get db() {
    if (!dbPromise) {
      throw new Error('数据库连接未准备好');
    }
    return dbPromise;
  },
};
