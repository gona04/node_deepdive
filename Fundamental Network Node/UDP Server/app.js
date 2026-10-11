import dgram from 'node:dgram';

/*
    Socket is an event emitter object
*/
const socket = dgram.createSocket("udp4");

// console.log(socket);

socket.on('message', (message,remoteAddress) => {
    console.log(message.toString('utf-8'));
    socket.send('Message Recievied', remoteAddress.port, '192.168.1.2')
})

socket.on('listening', () => {
    console.log(socket.address());
    console.log('listening');
})

// socket.send("Hello from app.js", 58164, '192.168.1.4')

//starts the server on a port 
socket.bind('3000')