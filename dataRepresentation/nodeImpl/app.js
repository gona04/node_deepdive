import fs from 'fs/promises';

const cv = await fs.readFile('../text.txt')

let binaryString = ''
// console.log(cv.toString('utf16le'))
cv.forEach(c => {
    binaryString += c.toString(2) + ' '
})

console.log(binaryString)