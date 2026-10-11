import { spawn } from "node:child_process";

const childProcess = spawn('node', ['./childApp.js']);

//Getting the outout of line 3 through following code
/* childProcess.stdout.on('data', (chunk) => {
    console.log('PRINTING FROM PARENTFILE:',chunk.toString());
}) */


// CHILD → PARENT
childProcess.stdout.on("data", (chunk) => {
    console.log("Parent received:", chunk.toString());
});

// PARENT → CHILD
childProcess.stdin.write("Hello guardian, from your home");

/*
The challenging part for me is I am assuming that this 
is a two way connection so I dont know how does parent talk to
the child is it just my assumption that the parent is talking to the child 
or is it really that way ? 
*/

