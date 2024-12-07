const jwt = require('jsonwebtoken');
const { error } = require('../utils/response');

function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return error(res, '未提供Token', 403);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return error(res, '无效的Token', 403);
    }

    req.user = decoded; // 将解码后的信息附加到请求对象
    next();
  });
}

module.exports = { verifyToken };
