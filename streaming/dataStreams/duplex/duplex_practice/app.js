import {spawn} from 'node:child_process';

const childProcess = spawn('node --watch', ['./childApp.js']);

childProcess.stdout.on('data', (chunk) => {
    console.log('From parent:', chunk.toString());
})

childProcess.stdin.write('Hello I am your gaurdian');