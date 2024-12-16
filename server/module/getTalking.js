const db = require('../db/ssh');

async function getTalking(req, res) {
    try {
        const connection = await db.db; // 等待数据库连接初始化
        console.log('收到GET请求'); // 添加日志

        const query = 'SELECT * FROM conversation';
        const [rows] = await connection.query(query);

        res.status(200).json(rows);
    } catch (err) {
        console.error('Database Error:', err); // 打印完整的错误对象
        res.status(500).json({ error: 'Database error', details: JSON.stringify(err) });
    }
}

module.exports = {
    getTalking,
};