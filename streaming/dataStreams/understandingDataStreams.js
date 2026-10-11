// import fs from 'fs/promises';
// import fs from 'fs';

// process.stdout.write('Hello\n'); <- this is console.log 

//This will take data from where ever the code is run
/* process.stdin.on('data', (chunk) => {
    console.log('Recived data:',chunk.toString());
}) */

//Writing out console text in a file
//To write live use buffers other wise use streams 
//buffers
/* process.stdin.on('data', (chunk) => {
    fs.appendFile('./text.txt', chunk);
}) */

// using writable streams 
/* const writeableStream = fs.createWriteStream('./text.txt');

process.stdin.on('data', (chunk) => {
    writeableStream.write(chunk);
}) */


