import fs from 'fs/promises';


process.stdin.on('data', (chunk) => {
    fs.appendFile('./fromConsole.txt', chunk);
})