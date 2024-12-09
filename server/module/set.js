const db = require('../db/connect'); // 引入数据库连接

// 处理 POST 请求，插入任务信息
async function setTask(req, res) {
  const { publisher_id, type, description, employee_id, amount, task_time, location } = req.body;
  // 校验必填字段是否存在
  if (!publisher_id || !type || !description || !amount || !task_time) {
    return res.status(400).json({ message: '缺少必填字段' });
  }

  try {
    const checkUserQuery = 'SELECT * FROM users WHERE account = ?';
    const [userResult] = await db.execute(checkUserQuery, [publisher_id]);
    const publisher_gender = userResult[0]?.gender;
    if (userResult.length === 0) {
      return res.status(400).json({ message: '发布者ID不存在' });
    }

    // SQL 插入语句
    const insertTaskQuery = `
      INSERT INTO tasks (publisher_id, publisher_gender, type, description, amount, task_time, location)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    // 执行插入操作
    const [result] = await db.execute(insertTaskQuery, [
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

  // 校验任务ID和员工ID是否存在
  if (!task_id || !employee_id) {
      return res.status(400).json({ message: '缺少必要的参数' });
  }

  try {
      const query = `UPDATE tasks 
                      SET employee_id = ?, status = '已接单' 
                      WHERE task_id = ? AND status = '待接单'`;

      const [result] = await db.execute(query, [employee_id, task_id]);

      if (result.affectedRows === 0) {
          return res.status(400).json({ message: '该任务已被分配' });
      }

      return res.status(200).json({ message: '任务已成功分配,状态更新为“已接单”' });
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
    // 1. 根据 task_id 查询任务，确保任务存在
    const getTaskQuery = 'SELECT * FROM tasks WHERE task_id = ?';
    const [taskResult] = await db.execute(getTaskQuery, [task_id]);

    if (taskResult.length === 0) {
      return res.status(404).json({ message: '任务不存在' });
    }

    const task = taskResult[0];
    if (task.status !== '已接单') {
      return res.status(400).json({ message: '任务未开始或已完成' });
    }

    // 2. 获取任务金额
    const amount = task.amount;
    const publisher_id = task.publisher_id;
    const employee_id = task.employee_id;

    // 3. 更新任务状态为 "已完成"
    const updateTaskStatusQuery = 'UPDATE tasks SET status = "已完成" WHERE task_id = ?';
    await db.execute(updateTaskStatusQuery, [task_id]);

    // 4. 更新发布者账户，余额减去任务金额
    const updatePublisherBalanceQuery = 'UPDATE users SET balance = balance - ? WHERE account = ?';
    await db.execute(updatePublisherBalanceQuery, [amount, publisher_id]);

    // 5. 更新接单人账户，余额增加
    const updateEmployeeBalanceQuery = 'UPDATE users SET balance = balance + ? WHERE account = ?';
    await db.execute(updateEmployeeBalanceQuery, [amount, employee_id]);

    // 返回成功的响应
    return res.status(200).json({ message: '订单已完成，余额已更新' });

  } catch (err) {
    console.error('完成订单出错:', err);
    return res.status(500).json({ message: '服务器错误' });
  }
}

module.exports = { setTask, setOrder, completeOrder };
