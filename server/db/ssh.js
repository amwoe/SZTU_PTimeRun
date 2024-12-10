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
  connectionLimit: 100,
  connectTimeout: 10000,
};

let dbPromise; 

sshClient
  .on('ready', () => {
    console.log('ssh连接已建立');

    // 创建 SSH 隧道
    sshClient.forwardOut(
      '127.0.0.1', // 本地 IP 地址
      0,           // 本地端口（自动选择）
      dbConfig.host, // 远程 MySQL 主机
      3306,         // 远程 MySQL 端口
      (err, stream) => {
        if (err) {
          console.error('端口错误:', err);
          return;
        }

        // 使用 SSH 隧道建立 MySQL 连接
        const pool = mysql.createPool({
          ...dbConfig,
          stream, // 将隧道流传递给 MySQL 连接
        });

        dbPromise = pool.promise(); // 创建 Promise 化的连接池
        console.log('通过ssh隧道建立MySQL连接');
      }
    );
  })
  .on('error', (err) => {
    console.error('SSH Connection error:', err);
  })
  .connect(sshConfig);

// 导出 db 对象
module.exports = {
  get db() {
    if (!dbPromise) {
      throw new Error('无法连接数据库');
    }
    return dbPromise;
  },
};
