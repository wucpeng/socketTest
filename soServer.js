'use strict';
const app = require('http').createServer();
const io = require('socket.io')(app);
const host = "192.168.0.10";
const port = "50053";
app.listen(port);
let clientCount = 0;
io.on('connection', (socket)=> {
    clientCount ++;
    socket.nickname = 'user' + clientCount;
    // namespace.emit(eventName [, ...args]) 向所有连接的客户端发出事件
    io.emit('enter', socket.nickname + ' comes in');

    socket.on('message', function(str) {
        io.emit('mes', socket.nickname + ' says: ' + str);
    });

    socket.on('login', function(str) {
        console.log(socket.nickname + ' says: ' + str)
        socket.emit('login',  str);
    });

    // disconnect为默认断开连接事件
    socket.on('disconnect', function(){
        io.emit('leave', socket.nickname + ' left');
    });
});

console.log("websocket server listening on port: " + port + ", on hostname: " + host);