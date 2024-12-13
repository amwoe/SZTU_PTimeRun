const express = require('express')
const app = express()

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

// learning guidance 路由导入
const learnGuidanceRouter = require('./router/learnGuidance.js')

// talk 路由导入
const talkRouter = require('./router/Talking.js')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// app.use(expressJWT({
//     secret: process.env.JWT_SECRET,
//     algorithms: ['HS256']
// }).unless({ path: ['/api/login'] }));


app.use('/api',authRouter)
app.use('/api',taskRouter)

// learning guidance
app.use('/api',learnGuidanceRouter)

// talk
app.use('/api',talkRouter)

app.listen(3000, ()=>{
    console.log("server running at http://127.0.0.1:3000")
    console.log(`已启动全局定期保持数据库连接的任务，每隔 ${KEEP_ALIVE_INTERVAL / 60000} 分钟执行一次`)
})