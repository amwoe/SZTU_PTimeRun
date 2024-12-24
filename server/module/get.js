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

//查询我发布的任务处于三种状态的数量
async function myTaskCount(req, res) {
  try {
    const { user_id } = req.body;
    // 等待 db 连接池初始化完成
    const connection = await db.db;
    const [rows] = await connection.query(`
      SELECT 
        COUNT(CASE WHEN t.status = '未接单' THEN 1 END) AS unclaimed_count,
        COUNT(CASE WHEN t.status = '正在进行' THEN 1 END) AS in_progress_count,
        COUNT(CASE WHEN t.status = '已完成' THEN 1 END) AS completed_count
      FROM 
        task t
      WHERE 
        t.publisher_id = ?
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

async function myOrderCount(req, res) {
  try {
    const { user_id } = req.body;
    // 等待 db 连接池初始化完成
    const connection = await db.db;
    const [rows] = await connection.query(`
      SELECT 
        COUNT(CASE WHEN t.status = '正在进行' THEN 1 END) AS in_progress_count,
        COUNT(CASE WHEN t.status = '已完成' THEN 1 END) AS completed_count
      FROM 
        task t
      WHERE 
        t.employee_id = ?
    `, [user_id]);
    // 返回查询结果
    res.status(200).json(rows); 
  } catch (err) {
    console.error('查询任务出错:', err);
    res.status(500).json({ message: '服务器错误' });
  }
}



async function getBalance(req, res) {
  try {
    const { user_id } = req.body;
    console.log('Received user_id:', user_id);
    // 等待 db 连接池初始化完成
    const connection = await db.db;
    const [rows] = await connection.query(`
      SELECT 
        balance
      FROM 
        users
      WHERE 
        user_id = ?
    `, [user_id]);
    
    if (rows.length > 0) {
      res.status(200).json({ balance: rows[0].balance });
    } else {
      res.status(404).json({ message: '用户不存在' });
    }

  } catch (err) {
    console.error('查询余额出错:', err);
    res.status(500).json({ message: '服务器错误', error: err.message || err });
  }
}

async function getAnotherMoney(req, res) {
  try {
    const { employee_id } = req.body;
    console.log('Received employee_id:', employee_id);
    // 等待 db 连接池初始化完成
    const connection = await db.db;
    const [rows] = await connection.query(`
    SELECT
        SUM(CASE WHEN status = '正在进行' THEN salary ELSE 0 END) AS ongoing_salary, 
        SUM(CASE WHEN status = '已完成' THEN salary ELSE 0 END) AS completed_salary
    FROM 
        task
    WHERE 
        employee_id = ?;
    `, [employee_id]);
    // 返回查询结果
    res.status(200).json(rows); 
  } catch (err) {
    console.error('查询未提取出错:', err);
    res.status(500).json({ message: '服务器错误', error: err.message || err });
  }
}

module.exports = { getTask, myTask, myOrder, getTask_1, getTask_2 , getTask_3, myTaskCount, myOrderCount ,getBalance, getAnotherMoney};
