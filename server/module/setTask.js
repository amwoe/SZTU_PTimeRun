const db = require('../db/connect'); // 引入数据库连接

// 处理 POST 请求，插入任务信息
async function setTask(req, res) {
  const { publisher_id, publisher_gender, type, description, employee_id, status, amount, task_time, location } = req.body;

  // 校验必填字段是否存在
  if (!publisher_id || !type || !description || !amount || !task_time) {
    return res.status(400).json({ message: '缺少必填字段' });
  }

  try {
    // 检查 publisher_id 是否存在于 users 表中
    const checkUserQuery = 'SELECT * FROM users WHERE account = ?';
    const [userResult] = await db.execute(checkUserQuery, [publisher_id]);

    if (userResult.length === 0) {
      return res.status(400).json({ message: '发布者ID不存在' });
    }

    // SQL 插入语句
    const insertTaskQuery = `
      INSERT INTO tasks (publisher_id, publisher_gender, type, description, employee_id, status, amount, task_time, location)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // 执行插入操作
    const [result] = await db.execute(insertTaskQuery, [
      publisher_id,
      publisher_gender,
      type,
      description,
      employee_id || null,
      status,
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

module.exports = { setTask };
