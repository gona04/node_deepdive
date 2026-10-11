import fs from 'fs';

const readStream = fs.createReadStream('../text.txt', {highWaterMark:4});

readStream.on('data', (chunk) => {
    process.stdout.write(chunk);
})