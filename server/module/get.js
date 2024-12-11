const db = require('../db/ssh');
const { error, success } = require('../utils/response');

//获取任务信息
async function getTask(req, res) {
  try {
    // 等待 db 连接池初始化完成
    const connection = await db.db;
    const [rows] = await connection.query(`SELECT * FROM tasks ORDER BY task_time DESC`);
    // 返回查询结果
    res.status(200).json(rows); 
  } catch (err) {
    console.error('查询任务出错:', err);
    res.status(500).json({ message: '服务器错误' });
  }
}


//查询我发布的任务
async function myTask(req, res) {
  try {
    const { publisher_id } = req.body;
    // 等待 db 连接池初始化完成
    const connection = await db.db;
    const [rows] = await connection.query(`SELECT * FROM tasks where publisher_id = ? ORDER BY task_time DESC`, [publisher_id]);
    // 返回查询结果
    res.status(200).json(rows); 
  } catch (err) {
    console.error('查询任务出错:', err);
    res.status(500).json({ message: '服务器错误' });
  }
}


//查询我接取的订单
async function myOrder(req, res) {
  try {
    const { employee_id } = req.body;
    // 等待 db 连接池初始化完成
    const connection = await db.db;
    const [rows] = await connection.query(`SELECT * FROM tasks where employee_id = ? ORDER BY task_time DESC`, [employee_id]);
    // 返回查询结果
    res.status(200).json(rows); 
  } catch (err) {
    console.error('查询任务出错:', err);
    res.status(500).json({ message: '服务器错误' });
  }
}

module.exports = { getTask, myTask, myOrder };
