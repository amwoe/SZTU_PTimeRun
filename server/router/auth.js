const express = require('express');
const { login } = require('../module/login');
const { verifyToken } = require('../middleware/identity');

const authRouter = express.Router();

// 登录接口
authRouter.post('/login', login);

// 示例：受保护的路由，需要 Token
authRouter.get('/profile', verifyToken, (req, res) => {
  res.json({
    status: 'success',
    message: '访问成功',
    user: req.user,
  });
});

module.exports = authRouter;
