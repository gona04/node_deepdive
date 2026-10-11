import fs from 'fs';
import fsPromise from 'fs/promises';

const readStream = fs.createReadStream('../text.txt', {highWaterMark: 16});

readStream.on('data', (chunk) => {
    setTimeout(() => {
       fsPromise.appendFile('createFromReadStream.txt', chunk);
        readStream.resume()
    }, 2000)
    readStream.pause()
})