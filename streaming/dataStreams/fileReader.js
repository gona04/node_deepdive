import fs from 'fs';

const readStream = fs.createReadStream('./text.txt')

readStream.on('data', (chunk) => {
    console.log(chunk.toString());
})

process.stdout.on('data', (chunk) => {
    console.log('PRINTING FROM CHILD'+chunk);
})