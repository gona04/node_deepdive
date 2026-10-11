import dgram from 'node:dgram';

/*
    Socket is an event emitter object
*/
const socket = dgram.createSocket("udp4");

// console.log(socket);

socket.on('message', (a,b) => {
    console.log(a.toString('utf-8'),b);
})

socket.on('listening', () => {
    console.log(socket.address());
    console.log('listening');
})

socket.send("Hello from abc", 3000, '192.168.1.2')

//starts the server on a port 
// socket.bind(58164)