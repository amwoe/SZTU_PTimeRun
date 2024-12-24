const db = require('../db/ssh');

//插入任务信息（发布任务）
async function setTask(req, res) {
  const { publisher_id, task_type, description, salary, location, hour, minute, runner_gender_requirement } = req.body;

  // 校验必填字段是否存在
  if (!publisher_id || !task_type || !description || !salary || !hour || !minute) {
    return res.status(400).json({ message: '缺少必填字段' });
  }
  
  const deadline = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00`;

  console.log(deadline)

  try {
    const connection = await db.db; // 等待数据库连接初始化

    // 插入任务信息
    const insertTaskQuery = `
      INSERT INTO task (publisher_id,task_type, description, salary, location, deadline, runner_gender_requirement)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await connection.query(insertTaskQuery, [
      publisher_id,
      task_type,
      description,
      salary,
      location || null,
      deadline,
      runner_gender_requirement || null,
    ]);

    // 返回插入成功的任务ID
    return res.status(200).json({ message: '任务创建成功', task_id: result.insertId });
  } catch (err) {
    console.error('插入任务出错:', err);
    return res.status(500).json({ message: '服务器错误' });
  }
}



//更新任务状态（接取任务）
async function setOrder(req, res) {
  const { task_id, user_id } = req.body;

  if (!task_id || !user_id) {
    return res.status(400).json({ message: '缺少必要的参数' });
  }

  const connection = await db.db; // 等待数据库连接初始化
  const [col] = await connection.query(`SELECT * FROM task WHERE task_id = ? AND publisher_id = ?;`, [task_id, user_id]);

  if (col.length > 0) { 
    return res.status(400).json({ message: '用户无法接取由自己发布的订单' });
  }

  try {
    // const connection = await db.db; // 等待数据库连接初始化

    const query = `
      UPDATE task 
      SET employee_id = ?, status = '正在进行' 
      WHERE task_id = ? AND status = '未接单'
    `;
    const [result] = await connection.query(query, [user_id, task_id]);

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: '该任务已被分配' });
    }

    return res.status(200).json({ message: '任务已成功分配，状态更新' });
  } catch (err) {
    console.error('更新任务出错:', err);
    return res.status(500).json({ message: '服务器错误' });
  }
}

//任务完成
async function completeOrder(req, res) { 
  const { task_id } = req.body;

  if (!task_id) {
    return res.status(400).json({ message: '缺少 task_id 参数' });
  }

  try {
    const connection = await db.db; // 等待数据库连接初始化

    // 查询任务是否存在
    const getTaskQuery = 'SELECT * FROM task WHERE task_id = ?';
    const [taskResult] = await connection.query(getTaskQuery, [task_id]);

    if (taskResult.length === 0) {
      return res.status(404).json({ message: '任务不存在' });
    }

    const task = taskResult[0];
    if (task.status === '未接单' || task.status === '已完成') {
      return res.status(400).json({ message: '任务未开始或已完成' });
    }

    const { salary, publisher_id, employee_id } = task;

    // 更新任务状态为 "已完成"
    const updatetasktatusQuery = 'UPDATE task SET status = "已完成" WHERE task_id = ?';
    await connection.query(updatetasktatusQuery, [task_id]);

    // 更新发布者账户，余额减少
    const updatePublisherBalanceQuery = 'UPDATE users SET balance = balance - ? WHERE user_id = ?';
    await connection.query(updatePublisherBalanceQuery, [salary, publisher_id]);

    // 更新接单人账户，余额增加
    const updateEmployeeBalanceQuery = 'UPDATE users SET balance = balance + ? WHERE user_id = ?';
    await connection.query(updateEmployeeBalanceQuery, [salary, employee_id]);

    return res.status(200).json({ message: '订单已完成，余额已更新' });
  } catch (err) {
    console.error('完成订单出错:', err);
    return res.status(500).json({ message: '服务器错误' });
  }
}

async function setTask_2(req, res) {
  const { publisher_id, task_type, cover, description, salary } = req.body;

  // 校验必填字段是否存在
  if (!publisher_id || !task_type || !description || !salary ) {
    return res.status(400).json({ message: '缺少必填字段' });
  }

  try {
    const connection = await db.db; // 等待数据库连接初始化

    // 插入任务信息
    const insertTaskQuery = `
      INSERT INTO task (publisher_id,task_type, cover, description, salary)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await connection.query(insertTaskQuery, [
      publisher_id,
      task_type,
      cover,
      description,
      salary
    ]);

    // 返回插入成功的任务ID
    return res.status(200).json({ message: '任务创建成功', task_id: result.insertId });
  } catch (err) {
    console.error('插入任务出错:', err);
    return res.status(500).json({ message: '服务器错误' });
  }
}

module.exports = { setTask, setOrder, completeOrder, setTask_2 };
