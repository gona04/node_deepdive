const response = await fetch('http://localhost:4000/')


response.headers.forEach((value, key) => {
    console.log(key, value);
})
/* for await (const chunk of response.body) {
    console.log(chunk);
} */