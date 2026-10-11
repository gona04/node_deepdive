import {open} from 'node:fs/promises'
import net from "node:net";

const server = net.createServer((socket) => {
    socket.on('error', (err) => {
        console.log(err);
    })
})

server.listen(4000, "0.0.0.0", () => {
  console.log("Listening to port 4000");
})

server.on('connection', (socket) => {
    let responseStarted = false;

    socket.on('data', async (chunk) => {
        console.log(chunk.toString());

        if (responseStarted) {
            return;
        }
        responseStarted = true;
        const filePath = new URL('./numbers.txt', import.meta.url);
        const fileHandler = await open('./numbers.txt');
        const {size} = fileHandler.stat()
        const readStream = fileHandler.createReadStream(filePath);

        socket.write(
            'HTTP/1.1 200 OK\r\n' +
            'Access-Control-Allow-Origin: *\r\n' +
            'Access-Control-Expose-Headers: *\r\n' +
            `Content-Length: ${size}\n`+
            'Content-Disposition: attachment; filename="OneLackNums.txt"\n' +
            '\r\n'
        );

        readStream.on('error', (error) => {
            console.error('Could not read response file:', error.message);
            socket.destroy();
        });
        // readStream.pipe(socket);
        readStream.on('data', (chunk) => {
            socket.write(chunk);
            readStream.pause();
            setTimeout(() => {
                readStream.resume()
            }, 10)
        })
    })
})