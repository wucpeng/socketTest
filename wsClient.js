'use strict';
const WebSocket = require("ws");
const ws = new WebSocket('ws://192.168.0.10:50053/');

ws.on('open', function () {
    ws.send('Hello!我是WS客户端');//发送消息给服务端
});

ws.on('message', function (message) {
    console.log("data", message);//监听来自服务端的消息
})
