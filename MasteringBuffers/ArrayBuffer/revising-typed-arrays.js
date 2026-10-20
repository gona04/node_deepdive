import fs from 'fs';

let ab = new ArrayBuffer(6);

let int8 = new Int8Array(ab);

int8[0] = '0x47';
int8[1] = '0x6F';
int8[2] = '0x6F';
int8[3] = '0x6E';
int8[4] = '0x6A';
int8[5] = '0x61';

let textDecode = new TextDecoder('utf-8')

console.log(textDecode.decode(int8));

fs.writeFileSync('name.txt', textDecode.decode(int8));