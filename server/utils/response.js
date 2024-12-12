function success(res, data) {
    return res.json({
        success: true, // 符合前端要求
        status: 'success',
        data,
    });
}
  
function error(res, message, code = 400) {
    return res.status(code).json({
        success: false, // 符合前端要求
        status: 'error',
        message,
    });
}
  
module.exports = { success, error };
