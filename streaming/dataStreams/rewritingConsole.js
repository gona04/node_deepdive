process.stdin.on('data', (chunk) => {
    console.log('The data you entered:', chunk.toString())
})