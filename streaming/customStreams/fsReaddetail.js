import fs from 'fs'; 
//7.316 ms
console.time('read sync')
const fd = fs.openSync('../text-two.txt', 'r')

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
