import dgram from 'dgram';

const socket = dgram.createSocket('udp4');


socket.send('Hey are you there?', 2000, '192.168.1.4')