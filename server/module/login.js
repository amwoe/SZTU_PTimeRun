const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../db/ssh');
const { error, success } = require('../utils/response');

async function login(req, res) {
    try {
        const { account, password } = req.body;
        console.log('接收到的请求数据:', req.body);

        if (!account || !password) {
            return error(res, '账号和密码不能为空', 402);
        }

        const connection = await db.db;
        if (!connection) {
            return error(res, '数据库连接失败', 500);
        }

        const [rows] = await connection.query('SELECT * FROM users WHERE user_id = ?', [account]);
        if (!Array.isArray(rows) || rows.length === 0) {
            return error(res, '账号不存在', 404);
        }

        const user = rows[0];
        if (!user.password || password !== user.password) {
            return error(res, '密码错误', 401);
        }

        const token = jwt.sign(
            { userId: user.user_id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        return success(res, { token });
    } catch (err) {
        console.error('服务器错误:', err);
        return error(res, '服务器错误', 500);
    }
}


module.exports = { login };
