const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../db/ssh');
const { error, success } = require('../utils/response');

async function login(req, res) {
  const { account, password } = req.body;

  // 账号和密码不能为空
  if (!account || !password) {
    return error(res, '账号和密码不能为空');
  }

  try {
    // 等待数据库连接池初始化
    const connection = await db.db;
    const [rows] = await connection.query('SELECT * FROM users WHERE account = ?', [account]);

    if (rows.length === 0) {
      return error(res, '账号不存在', 404);
    }

    const user = rows[0];

    // 明文密码比对
    if (password !== user.password) {
      return error(res, '密码错误', 401); // 密码不匹配，返回401
    }

    // 如果密码验证成功，生成 JWT Token
    const token = jwt.sign(
      { userId: user.id, account: user.account },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );

    // 返回 token
    return success(res, { token });
  } catch (err) {
    console.error(err);
    return error(res, '服务器错误');
  }
}

module.exports = { login };
