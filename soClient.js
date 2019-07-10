'use strict';
const io = require('socket.io-client');
const socket = io.connect('ws://192.168.0.10:50053/', {reconnect: true});
socket.on('connect', (socket)=> {//绑定连接上服务器之后触发的数据
    console.log('连上了服务器!');

});

socket.emit('login', "我是客户端，开始登陆。。。。");

socket.on('login', (str)=> {
    console.log('login', str);
    socket.emit('login', str);
});

socket.on('systemMessage', function(data) {//监听服务器发送的消息
    console.log(data)
});
