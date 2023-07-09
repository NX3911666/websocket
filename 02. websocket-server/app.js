const ws = require('nodejs-websocket')
const PORT = 3000

const server = ws.createServer(conn => {
    console.log('有用户链接');
    conn.on('text',data => {
        // console.log("接受用户数据",data);
        conn.sendText(data)
    })
    conn.on("close",function(code ,reason){
        console.log("connet closed");
    })
    conn.on("error",()=> {
        console.log("用户断开");
    })
})

server.listen(PORT,()=> {
    console.log('websocket已链接 监听' + PORT);
})