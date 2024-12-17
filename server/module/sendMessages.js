const db = require('../db/ssh');
const { error, success } = require('../utils/response');

let clients = [];

function sendNewMessage(message) {
  clients.forEach(client => client.json(message));
  clients = [];
}

async function sendMessageToDB(req, res) {
  try {
    const connection = await db.db; // 等待数据库连接初始化
    const { sender_id, participant_user_id, message_content, conversation_created_at } = req.body;

    if (!sender_id || !participant_user_id || !message_content || !conversation_created_at) {
      return res.status(400).json({ error: 'Missing or invalid required fields' });
    }

    const query = 'INSERT INTO conversation (conversation_created_at, sender_id, message_content, participant_user_id) VALUES (?, ?, ?, ?)';
    const params = [
      new Date(conversation_created_at),
      sender_id,
      message_content,
      participant_user_id,
    ];

    await connection.query(query, params);

    const newMessage = { sender_id, participant_user_id, message_content, conversation_created_at: new Date(conversation_created_at) };
    sendNewMessage(newMessage);

    res.status(200).json({ success: true, message: 'Message saved successfully' });
  } catch (error) {
    console.error('Full Database Error:', error); // 打印完整的错误对象
    res.status(500).json({ error: 'Database error', details: JSON.stringify(error) });
  }
}

module.exports = {
  sendMessageToDB,
  sendNewMessage
};