function success(res, data) {
    return res.json({
        status: 'success',
        data,
    });
}
  
function error(res, message, code = 400) {
    return res.status(code).json({
        status: 'error',
        message,
    });
}
  
module.exports = { success, error };
  