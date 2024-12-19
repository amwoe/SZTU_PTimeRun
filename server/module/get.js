const db = require('../db/ssh');
const { error, success } = require('../utils/response');

//获取任务信息
async function getTask(req, res) {
  try {
    // 等待 db 连接池初始化完成
    const connection = await db.db;
    const [rows] = await connection.query(`SELECT * FROM task ORDER BY task_id DESC`);
    // 返回查询结果
    res.status(200).json(rows); 
  } catch (err) {
    console.error('查询任务出错:', err);
    res.status(500).json({ message: '服务器错误' });
  }
}

async function getTask_1(req, res) {
  try {
    // 等待 db 连接池初始化完成
    const connection = await db.db;

    // 执行查询语句，获取所有任务的详细信息
    const [rows] = await connection.query(`
      SELECT 
        t.task_id, 
        t.cover, 
        t.task_type, 
        t.description AS task_description, 
        t.runner_gender_requirement, 
        t.location AS address_info,
        DATE_FORMAT(t.deadline, '%H:%i') AS deadline,  -- 格式化只保留时和分
        t.salary, 
        t.status AS task_status, 
        u.username AS publisher_username,
        u.cover AS publisher_avator
      FROM 
        task t
      JOIN 
        users u ON t.publisher_id = u.user_id
      WHERE 
        t.task_type IN ('代取快递', '食堂带饭', '外卖上楼') AND t.status = '未接单'
      ORDER BY 
        t.task_id DESC
    `);

    // 返回查询结果
    res.status(200).json(rows);
  } catch (err) {
    console.error('查询任务出错:', err);
    res.status(500).json({ message: '服务器错误' });
  }
}

async function getTask_2(req, res) {
  try {
    // 等待 db 连接池初始化完成
    const connection = await db.db;

    // 执行查询语句，获取所有任务的详细信息
    const [rows] = await connection.query(`
      SELECT 
        t.task_id, 
        t.cover, 
        t.task_type, 
        t.description AS task_description, 
        t.runner_gender_requirement, 
        t.location AS address_info,
        DATE_FORMAT(t.deadline, '%H:%i') AS deadline,  -- 格式化只保留时和分
        t.salary, 
        t.status AS task_status, 
        u.username AS publisher_username,
        u.cover AS publisher_avator
      FROM 
        task t
      JOIN 
        users u ON t.publisher_id = u.user_id
      WHERE 
        t.task_type IN ('代取快递', '食堂带饭', '外卖上楼') AND t.status IN ('正在进行','已完成')
      ORDER BY 
        t.task_id DESC
    `);

    // 返回查询结果
    res.status(200).json(rows);
  } catch (err) {
    console.error('查询任务出错:', err);
    res.status(500).json({ message: '服务器错误' });
  }
}

async function getTask_3(req, res) {
  try {
    // 等待 db 连接池初始化完成
    const connection = await db.db;

    // 执行查询语句，获取所有任务的详细信息
    const [rows] = await connection.query(`
      SELECT 
        t.task_id, 
        t.cover, 
        t.task_type, 
        t.description AS task_description, 
        t.runner_gender_requirement, 
        t.location AS address_info,
        DATE_FORMAT(t.deadline, '%H:%i') AS deadline,  
        t.salary, 
        t.status AS task_status, 
        u.username AS publisher_username,
        u.cover AS publisher_avator
      FROM 
        task t
      JOIN 
        users u ON t.publisher_id = u.user_id
      WHERE 
        t.task_type IN ('代课', '闲物', '租借')
      ORDER BY 
        t.task_id DESC
    `);

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
    const { user_id } = req.body;
    // 等待 db 连接池初始化完成
    const connection = await db.db;
    const [rows] = await connection.query(`
      SELECT 
        t.task_type, 
        t.deadline, 
        t.status AS task_status, 
        u.username AS employee_name,
        u.cover AS employee_avator
      FROM 
        task t
      JOIN 
        users u ON t.employee_id = u.user_id
      WHERE 
        t.publisher_id = ?
      ORDER BY 
        t.task_id DESC
    `, [user_id]);
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
    const { user_id } = req.body;
    // 等待 db 连接池初始化完成
    const connection = await db.db;
    const [rows] = await connection.query(`
      SELECT 
        t.task_type, 
        t.deadline, 
        t.status AS task_status, 
        u.username AS publisher_name,
        u.cover AS publisher_avator
      FROM 
        task t
      JOIN 
        users u ON t.publisher_id = u.user_id
      WHERE 
        t.publisher_id = ?
      ORDER BY 
        t.task_id DESC
    `, [user_id]);
    // 返回查询结果
    res.status(200).json(rows); 
  } catch (err) {
    console.error('查询任务出错:', err);
    res.status(500).json({ message: '服务器错误' });
  }
}

module.exports = { getTask, myTask, myOrder, getTask_1, getTask_2 , getTask_3};
