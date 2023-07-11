const ws = require('nodejs-websocket')
const POST = 3000;
let count = 0;

const  MsgType = {
    TYPE_ENTER: 0 ,
    TYPE_LEAVE: 1,
    TYPE_MSG : 2,
}
const server = ws.createServer(conn => {
    console.log("开始链接");
    count++
    conn.userName = `用户${count}`
    broadcast({
        type: MsgType.TYPE_ENTER,
        msg: `${conn.userName}进入聊天室`,
        time: new Date().toLocaleTimeString()
    })
    conn.on('text',function(data) {
        // console.log(data);
        // 返回消息
        // conn.sendText(data);
        // 广播所有消息
       broadcast({
        type: MsgType.TYPE_MSG,
        msg: data,
        time: new Date().toLocaleTimeString()
       })
    })
    conn.on('close',function(){
        console.log("链接关闭");
        count -- ;
        broadcast({
            type: MsgType.TYPE_LEAVE,
            msg: `${conn.userName}离开聊天室`,
            time: new Date().toLocaleTimeString()
        })
    })
    conn.on('error',function(){
        console.log("链接异常/用户离开");
    })
})
// 广播
function broadcast(msg){
    server.connections.forEach(item => {
        // 传过来的msg只允许是字符串 这里将字符串转化为 json对象
        item.send(JSON.stringify(msg))
    });
}
server.listen(POST,function(){
    console.log("已经开始监听端口");
})
