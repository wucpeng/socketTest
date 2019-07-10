'use strict';
const Koa = require('koa');
const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
const port = 8081;

server.listen(process.env.PORT || port, () => {
    console.log(`app run at : http://127.0.0.1:${port}`);
})

io.on('connection', socket => {
    console.log('初始化成功！下面可以用socket绑定事件和触发事件了');
    socket.on('send', data => {
        console.log('客户端发送的内容：', data);
        socket.emit('getMsg', '我是返回的消息... ...');
    })

    setTimeout( () => {
        socket.emit('getMsg', '我是初始化3s后的返回消息... ...')
    }, 3000)
})