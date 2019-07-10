'use strict';
const net = require('net');
const client = new net.Socket();

const OPTION = {
    timeout: 500,
    encoding: 'utf8',
    tcpOption: {
        port: 30001,
        host: '192.168.0.10',
    },
    retriedTimes: 0,
    maxReTries: 100,
    retryInterval: 1000
};
client.setTimeout(OPTION.timeout);
client.setEncoding(OPTION.encoding);
console.log('client');

// client.on('data', data => {
//     console.log('DATA: ' + data);
//     // client.destroy();// close connect
// });
//
// client.on('end',() => {
//     console.log('Client disnected');
// });
//
// client.on('close', () => {
//     console.log('tcp connection closed');
//     reConnect()
// });
//
// client.on('error',err => {
//     // infoLogger.error(err);
// });
// client.on('timeout',() => {
//
// });
//
// function conncect() {
//     client.connect(OPTION.tcpOption,() => {
//         OPTION.retriedTimes = 0;
//         console.log(`tcp conncet success!--->local:${client.localAddress}:${client.localPort}=>remote:${client.remoteAddress}:${client.remotePort}`);
//         client.write('this is tcp client by Node.js');//服务器向客户端发送消息
//     });
//
// }
// //Reconnect server
// function reConnect() {
//     if (OPTION.retriedTimes >= OPTION.maxReTries) {
//         console.log('Max retries have been exceeded,I give up.');
//     } else {
//         OPTION.retriedTimes += 1;
//         console.log(`connect:${OPTION.retriedTimes}`);
//         setTimeout(conncect,OPTION.retryInterval);
//     }
// }
//
// conncect();


client.connect(OPTION.tcpOption, ()=> {//和服务器建立连接
    client.write('xxxxx');// 建立连接后立即向服务器发送数据，服务器将收到这些数据
    console.log('connect success');
});

client.on('data', (data)=> {//监听来自服务器的消息
    console.log('服务器说: ' + data);
    client.write(data);
    //client.destroy();// 主动关闭连接
});

client.on('close', ()=> {// 服务器一旦断开会触发此事件
    console.log('服务器主动断开了连接');
});

// let testClient = ()=> {
//     try {
//     } catch (e) {
//         console.log('catch err', e);
//     }
// };
//
// testClient();