const db = require('../db/ssh');
const { error, success } = require('../utils/response');

// 通用函数来获取资料信息
async function getMaterial(req, res, tableName) {
    try {
        const connection = await db.db;
        const [rows] = await connection.query(`SELECT * FROM ${tableName}`);
        res.status(200).json(rows);
    } catch (err) {
        console.error(`查询${tableName}出错:`, err);
        res.status(500).json({ message: '服务器错误' });
    }
}

// 获取所有学习指导信息
async function getAllLearnGuidance(req, res) {
    await getMaterial(req, res, 'learning_material');
}


module.exports = { 
    getAllLearnGuidance 
};