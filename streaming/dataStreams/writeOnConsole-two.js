import { spawn } from "node:child_process";

/* process.stdin.on('data', (chunk) => {
    console.log(`Got Data: ${chunk}`);
}) */

// const childProcess = spawn('node', ['./duplex/childApp.js']);

/* childProcess.stdout.on('data', (chunk) => {
    console.log(chunk.toString());
})

process.stdin.write('Hello From parent \n'); */

//=======================================================================
// Writing a code to read from the fileReader.js
const childProcess = spawn('node', ['./fileReader.js']);

childProcess.stdout.on('data', (chunk) => {
    console.log('Chunk is being printed in the parent')
    console.log(`\n${chunk}`)  
} )

process.stdin.write('\n Hello from parent \n');
