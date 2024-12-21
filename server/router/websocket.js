const WebSocket = require('ws'); // 导入 WebSocket 库

// 创建 WebSocket 服务
function createWebSocketServer(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('新客户端连接');

    // 接收消息
    ws.on('message', (data) => {
      // 解析客户端发来的消息
      let message;
      try {
        message = JSON.parse(data);
      } catch (err) {
        console.error('解析消息失败:', err);
        return;
      }

      // 广播消息给所有客户端
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      });
    });

    // 连接关闭事件
    ws.on('close', () => {
      console.log('客户端断开连接');
    });

    // 错误处理
    ws.on('error', (err) => {
      console.error('WebSocket 错误:', err);
    });
  });

  return wss;
}

module.exports = { createWebSocketServer };