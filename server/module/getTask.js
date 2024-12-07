const db = require('../db/connect');
const { error, success } = require('../utils/response');

async function getTask(req, res) {
    try {
      // 使用 await 语法查询任务表，避免回调函数
      const [rows] = await db.execute('SELECT * FROM tasks ORDER BY task_time DESC');
      
      // 返回查询结果
      res.status(200).json(rows); 
    } catch (err) {
      console.error('查询任务出错:', err);
      res.status(500).json({ message: '服务器错误' });
    }
  }

module.exports = { getTask };