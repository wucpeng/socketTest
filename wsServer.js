'use strict';
const ws = require("nodejs-websocket");
const host = "192.168.0.10";
const port = "50052";

let clientCount = 0;
let mapConns = {};

const server = ws.createServer((conn)=> {
    console.log("New connection");
    clientCount++;
    conn.nickname = 'user' + clientCount;
    broadcast(conn.nickname + " comes in");
    console.log('new conn', conn);
    mapConns[conn.nickname] = conn;
    // 收到文本时触发,str是收到的文本字符串
    conn.on("text", function(str) {
        console.log("Received" + str);
        broadcast(conn.nickname + ' send ' + str);
        //mapConns[conn.name]
    });
    // 连接关闭时触发
    conn.on("close", function(code, reason) {
        console.log("Connection closed");
        broadcast(conn.nickname + ' left');
    });
    // 发生错误时触发，如果握手无效，也会发出响应
    conn.on("error", function(err) {
        console.log("handle err");
        console.log(err);
    });
}).listen(port);

console.log("websocket server listening on port: " + port + ", on hostname: " + host);

let broadcast = (msg)=> {
    server.connections.forEach(function(conn) {
        conn.sendText(msg);
    });
}