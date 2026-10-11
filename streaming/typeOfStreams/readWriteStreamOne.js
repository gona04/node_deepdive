import fs from 'fs';

const readStream = fs.createReadStream('../../MasteringBuffers/base64/icon8.png', {highWaterMark:16});

const writeStream = fs.createWriteStream('../reverse-icon.png', {highWaterMark: 8});

readStream.on('data', (data) => {
    let canContinue = writeStream.write(data);
    console.log('Amount of data given by readStream', writeStream.writableLength)
    if(!canContinue) {
        readStream.pause()
    }
})

writeStream.on('drain', () => {
    readStream.resume();
})

readStream.on('close', () => {
    writeStream.end()
})

writeStream.on('finish', () => {
    console.log('Write file is closed')
})