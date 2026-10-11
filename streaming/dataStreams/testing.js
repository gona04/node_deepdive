console.log('Testing');
process.stdin.on('data', (chunk) => {
    console.log('Got data:',chunk.toString());
})