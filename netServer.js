'use strict';
const net = require('net');
const server = net.createServer();
const OPTION = {
    SOCKET: {
        port: 30001,
        host: '192.168.0.10',
        timeout:60000,
        keepAliveTime:10000
    }
}
let socketArr = [];
server.on('connection',(socket) => {
    console.log(`socketConnect:${socket.remoteAddress}:${socket.remotePort}`);
    socketArr.push(socket);
    // socket.setEncoding('utf8');
    socket.setTimeout(OPTION.SOCKET.timeout);
    socket.setKeepAlive(true,OPTION.SOCKET.keepAliveTime);//keep net alive
    socket.on('data', function(data) {
        console.log(`DATA ${socket.remoteAddress}`, data);
        socket.write('connect timeout,disconnecting,bye!');
        // JSON.stringify(myObj);
    });
    socket.on('timeout',() => {
        console.log('timeout');
        // sock.write('connect timeout,disconnecting,bye!');
        // socket.end();
    });

    socket.on('close', function() {
        let index = socketArr.indexOf(socket);
        socketArr.splice(index,1);
        console.log(`socketClose:${socket.remoteAddress}:${socket.remotePort}`);
    });

    socket.on('end', () => {
        console.log('client disconnected');
    });
    socket.on('error',(err) => {
        console.log(err);
    });
});
server.on('error', (err) => {
    console.log(err);
});
server.on('close',() => {
    console.log('server closed!');
});
server.listen(OPTION.SOCKET.port, () => {
    console.log(`socke server start! listen port ${OPTION.SOCKET.port}`);
});

exports.broadcast =  (data) => {
    try {
        for (let v of socketArr) {
            if (Buffer.isBuffer(data)) {
                v.write(data);
            }
        }
    } catch (err) {

    }
};