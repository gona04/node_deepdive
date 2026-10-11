import net from 'net';
const socket = net.createConnection({ host: "192.168.1.2", port: 2000 })
let spoken = 0;
socket.on("error", (err) => {
    console.log(err);
} )

process.stdin.on('data', (chunk) => {
    if(spoken === 0) {
        socket.write(JSON.stringify({name: chunk.toString().trim()}))
    } else {
        socket.write(chunk.toString());
    }
    spoken+=1;
})
process.stdout.write('Please enter your name \n');
socket.on('data', (chunk) => {
    const message = chunk.toString();

    try {
        const response = JSON.parse(message);
        if (response.type === 'users') {
            console.log(`You want to talk to ${response.names.join(', ')} or everyone?`);
        } else {
            console.log(message);
        }
    } catch {
        console.log(message);
    }
});