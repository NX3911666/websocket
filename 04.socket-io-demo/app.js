const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io")
// 添加跨域配置
const io = new Server(server,{cors: true});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', (socket) => {
    console.log('有用户链接');
    socket.on('getdata',data => {
            // 给浏览器发送数据
        console.log(data);
        socket.emit('send',data)
    })
  });
server.listen(3010, () => {
  console.log('listening on *:3010');
});
