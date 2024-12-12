const db = require('../db/ssh');
const { error, success } = require('../utils/response');

async function getTalking(req, res) {
  try {
    const messages = await db.query('SELECT * FROM messages');
    res.json(success(messages));
  } catch (err) {
    res.json(error('获取消息失败', err));
  }
}

module.exports = { getTalking };

