process.stdin.setEncoding('utf-8')

process.stdin.on('data', (chunk) => {
    console.log(chunk);
})