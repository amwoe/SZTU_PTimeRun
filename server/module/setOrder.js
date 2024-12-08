const db = require('../db/connect');

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
  
module.exports = { setOrder };