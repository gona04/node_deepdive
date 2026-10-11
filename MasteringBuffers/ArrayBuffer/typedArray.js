import fs from 'fs/promises';
const uint8Array = new Uint8Array(6);

uint8Array[0] = '0x67'
uint8Array[1] = '0x6F'
uint8Array[2] = '0x6F'
uint8Array[3] = '0x6E'
uint8Array[4] = '0x6A'
uint8Array[5] = '0x61'
console.log(uint8Array);

const decoding = new TextDecoder('utf-8');
console.log(decoding.decode(uint8Array))

fs.writeFile('8bitsTofile.txt', uint8Array);