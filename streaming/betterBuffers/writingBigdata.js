import fs from 'fs';
// 161.269ms
/* console.time('buffers take')
for (let i = 1; i <= 5000; i++) {
    if(i === 1) {
        fs.writeFileSync('writeBig.txt', `${i},`)
    }
    fs.appendFileSync('writeBig.txt', `${i},`);
}
console.timeEnd('buffers take')
 */

//13.888ms
/* const writeStream = fs.createWriteStream('streamfile.txt');

console.time('stream take')
for (let i = 1; i <= 5000; i++) {
        writeStream.write(`${i},`)
}

writeStream.end();

writeStream.on('finish', () =>{
    console.timeEnd('stream take')
}) */

//time: 0.221ms
//Open the file and keep writing using buffers 
let fd
const ab = new Buffer.alloc(100000)

console.time('custom buffer')
fd = fs.openSync('./writeBig.txt')

const result = fs.readSync(fd,ab)
console.timeEnd('custom buffer');
console.log(result);
console.log(ab.toString())