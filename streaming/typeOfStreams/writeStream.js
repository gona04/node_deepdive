import fs, { write } from "fs";

const writeStream = fs.createWriteStream("../wText.txt", { highWaterMark: 10 });

const readStream = fs.createReadStream("../text.txt", { highWaterMark: 25 });

readStream.on("data", (data) => {
  let canContinueWriting = writeStream.write(data);
  console.log("IS EMPTY VALUE", canContinueWriting);
  console.log("COMING OUTSIDE DRAIN", writeStream.writableLength);
  if (!canContinueWriting) {
    readStream.pause();
  }
});

readStream.on('end', () => {
    writeStream.end()
})

writeStream.on('finish', () => {
    console.log('Writting is done')
})

writeStream.on('close', () => {
    console.log('Writing file is closed')
})
writeStream.on("drain", () => {
  readStream.resume();
});
