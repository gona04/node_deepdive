import {spawn} from 'child_process';
import fs from 'fs';

const writeStream = fs.createWriteStream('./stdinout.txt')

const childProcess = spawn('node', ['./childApp.js']);

childProcess.stdout.on('data', (chunk) => {
    writeStream.write(chunk)
})