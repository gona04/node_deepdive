/* process.stdin.on('data', (chunk) => {
    console.log(`Coming from CHILD written in PARENT: ${chunk}\n`)
}) */

console.log('Sent from child file: Hey from my own home')

process.stdin.on('data', (data) => {
    console.log('Form gardian file: ', data.toString());
})