import http from 'http';
import fs from 'fs/promises';
const readHandler = await fs.open('../text.txt', "r");
const readStream = readHandler.createReadStream({highWaterMark: 1});

const server = http.createServer(async (req, res) => {
    res.setHeader("access-control-allow-origin", "*");
    res.setHeader('Content-Type', "text/txt");

    readStream.on('data', (chunk) => {
        setTimeout(() => {
            readStream.resume();
            res.write(chunk);
        }, 100)
        readStream.pause();
    })

    readStream.on('end', () => {
        res.end();
    })
})

server.listen(4000, "localhost", () => {
    console.log('Server Started')
})