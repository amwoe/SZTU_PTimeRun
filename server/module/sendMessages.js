const db = require('../db/ssh');
const { error, success } = require('../utils/response');

async function sendMessageToDB(message) {
    try {
        const query = 'INSERT INTO messages (content, timestamp) VALUES (?, ?)';
        const params = [message.content, new Date()];
        await db.execute(query, params);
        return success('Message sent to database successfully');
    } catch (err) {
        return error('Failed to send message to database', err);
    }
}

module.exports = {
    sendMessageToDB,
};

