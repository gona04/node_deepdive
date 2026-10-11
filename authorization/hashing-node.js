import crypto from 'node:crypto';
import fs from 'fs';

const fileData = fs.readFileSync('./DirectoryView.jsx');

const newFileData = `blob ${fileData.length}\0${fileData}`

const hash = crypto.createHash('sha1').update(newFileData).digest('hex');

console.log(hash);