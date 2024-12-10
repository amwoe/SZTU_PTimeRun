const db = require('../db/ssh');

// 处理 POST 请求，插入任务信息
async function setTask(req, res) {
  const { publisher_id, type, description, employee_id, amount, task_time, location } = req.body;

  // 校验必填字段是否存在
  if (!publisher_id || !type || !description || !amount || !task_time) {
    return res.status(400).json({ message: '缺少必填字段' });
  }

  try {
    const connection = await db.db; // 等待数据库连接初始化

    // 检查发布者是否存在
    const checkUserQuery = 'SELECT * FROM users WHERE account = ?';
    const [userResult] = await connection.query(checkUserQuery, [publisher_id]);

    if (userResult.length === 0) {
      return res.status(400).json({ message: '发布者ID不存在' });
    }

    const publisher_gender = userResult[0]?.gender;

    // 插入任务信息
    const insertTaskQuery = `
      INSERT INTO tasks (publisher_id, publisher_gender, type, description, amount, task_time, location)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await connection.query(insertTaskQuery, [
      publisher_id,
      publisher_gender,
      type,
      description,
      amount,
      task_time,
      location || null,
    ]);

    // 返回插入成功的任务ID
    return res.status(201).json({ message: '任务创建成功', task_id: result.insertId });
  } catch (err) {
    console.error('插入任务出错:', err);
    return res.status(500).json({ message: '服务器错误' });
  }
}

async function setOrder(req, res) {
  const { task_id, employee_id } = req.body;

  if (!task_id || !employee_id) {
    return res.status(400).json({ message: '缺少必要的参数' });
  }

  try {
    const connection = await db.db; // 等待数据库连接初始化

    const query = `
      UPDATE tasks 
      SET employee_id = ?, status = '已接单' 
      WHERE task_id = ? AND status = '待接单'
    `;
    const [result] = await connection.query(query, [employee_id, task_id]);

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: '该任务已被分配' });
    }

    return res.status(200).json({ message: '任务已成功分配，状态更新为“已接单”' });
  } catch (err) {
    console.error('更新任务出错:', err);
    return res.status(500).json({ message: '服务器错误' });
  }
}

async function completeOrder(req, res) {
  const { task_id } = req.body;

  if (!task_id) {
    return res.status(400).json({ message: '缺少 task_id 参数' });
  }

  try {
    const connection = await db.db; // 等待数据库连接初始化

    // 查询任务是否存在
    const getTaskQuery = 'SELECT * FROM tasks WHERE task_id = ?';
    const [taskResult] = await connection.query(getTaskQuery, [task_id]);

    if (taskResult.length === 0) {
      return res.status(404).json({ message: '任务不存在' });
    }

    const task = taskResult[0];
    if (task.status !== '已接单') {
      return res.status(400).json({ message: '任务未开始或已完成' });
    }

    const { amount, publisher_id, employee_id } = task;

    // 更新任务状态为 "已完成"
    const updateTaskStatusQuery = 'UPDATE tasks SET status = "已完成" WHERE task_id = ?';
    await connection.query(updateTaskStatusQuery, [task_id]);

    // 更新发布者账户，余额减少
    const updatePublisherBalanceQuery = 'UPDATE users SET balance = balance - ? WHERE account = ?';
    await connection.query(updatePublisherBalanceQuery, [amount, publisher_id]);

    // 更新接单人账户，余额增加
    const updateEmployeeBalanceQuery = 'UPDATE users SET balance = balance + ? WHERE account = ?';
    await connection.query(updateEmployeeBalanceQuery, [amount, employee_id]);

    return res.status(200).json({ message: '订单已完成，余额已更新' });
  } catch (err) {
    console.error('完成订单出错:', err);
    return res.status(500).json({ message: '服务器错误' });
  }
}

module.exports = { setTask, setOrder, completeOrder };
