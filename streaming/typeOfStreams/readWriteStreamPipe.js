import fs from 'fs'; 
import { pipeline } from 'stream';

const readStream = fs.createReadStream('../text.txt');

const writeStream = fs.createWriteStream('../text-three-pipeline.txt');

// readStream.pipe(writeStream); //<- this does not have error handleing 
// thus we'd have to do the following 

// readStream.on('error', (err) => {
//     console.log(err);
// })

// to avoid the above we can use the following 
pipeline(readStream, writeStream, (err) => {
    console.log(err);
})