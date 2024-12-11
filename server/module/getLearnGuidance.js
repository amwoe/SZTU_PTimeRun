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

//获取课程资料信息
async function courseMaterial(req, res) {
    await getMaterial(req, res, 'course_material');
}

//获取复习资料信息
async function reviewMaterial(req, res) {
    await getMaterial(req, res, 'review_material');
}

//获取学习指导信息
async function learnGuidance(req, res) {
    await getMaterial(req, res, 'learn_guidance');
}

module.exports = { courseMaterial, reviewMaterial, learnGuidance };