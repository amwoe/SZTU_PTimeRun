const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const http = require('http');
const WebSocket = require('ws'); // 引入 WebSocket 模块
const jwt = require('jsonwebtoken')
const expressJWT = require('express-jwt').expressjwt

const cors = require('cors')

const authRouter = require('./router/auth')
const taskRouter = require('./router/task')
const db = require('./db/ssh')


// 定期验证数据库连接的间隔（单位：毫秒）
const KEEP_ALIVE_INTERVAL = 30000; 

// 定义全局保持连接的函数
async function keepConnectionAlive() {
  try {
    const connection = await db.db; // 获取数据库连接
    console.log('定期检查数据库连接...');
    await connection.query('SELECT 1'); // 执行简单的SQL查询
    console.log('数据库连接成功');
  } catch (err) {
    console.error('保持连接失败:', err);
  }
}

// 启动定期任务
setInterval(keepConnectionAlive, KEEP_ALIVE_INTERVAL);

// 提供图片静态资源访问
app.use('/images/users', express.static(path.join('F:', 'images', 'users')));
app.use('/images/tasks', express.static(path.join('F:', 'images', 'tasks')));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 路由配置
app.use('/api', authRouter);
app.use('/api', taskRouter);

// learning guidance 路由导入
const learnGuidanceRouter = require('./router/learnGuidance.js');
app.use('/api', learnGuidanceRouter);

// talk 路由导入
const talkRouter = require('./router/Talking.js');
app.use('/api', talkRouter);

// 创建 HTTP Server
const server = http.createServer(app);

const { createWebSocketServer } = require('./router/websocket'); // 引入 WebSocket 服务模块
// 使用 WebSocket 服务
createWebSocketServer(server);


server.listen(3000, ()=>{
    console.log("server running at http://127.0.0.1:3000")
    console.log(`已启动全局定期保持数据库连接的任务，每隔 ${KEEP_ALIVE_INTERVAL / 60000} 分钟执行一次`)
})
