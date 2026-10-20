import { log } from 'console';
import dgram from 'dgram';

const socket = dgram.createSocket('udp4');


socket.on('message', (msg, rinfo) => {
    console.log(msg.toString('utf-8'));
    console.log(rinfo);
})
socket.on('listening', () =>{
    console.log('Listening to port 4000')
})
socket.bind(4000)