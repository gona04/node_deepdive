import fs from 'fs'; 
import path from 'path';
//7.316 ms
console.time('read sync')
const filePath = path.join(process.cwd(), '/streaming/customStreams/textCopy.txt' );
const fd = fs.openSync(filePath, 'r')

const b = Buffer.alloc(10) 
//Sync
const value = fs.readSync(fd,b)

//the number of bytes 
console.log(value);
//the avtual value
console.log(b.toString());

console.timeEnd('read sync')

// Async
/* fs.read(fd, {buffer:b} ,(err,bytesread, bufferValue) => {
    console.log(bytesread);
    console.log(bufferValue);
}) */
