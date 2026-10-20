console.log('Execution msg printed');

process.stdin.on('data', (chunk) => {
    //this is the output of the childApp
    console.log('3 Child Prints:', chunk.toString())
})