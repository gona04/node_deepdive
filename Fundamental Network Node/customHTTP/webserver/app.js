import { createReadStream } from "fs";
import http from "http";

const httpClient = http.createServer();

httpClient.on("request", async (req, res) => {
  // res.setHeader('Content-Type', 'text/html');
  if (req.url == "/") {
    let readStream = createReadStream("./index.html");

    readStream.pipe(res);
  } else if(req.url !== './/.well-known/appspecific/com.chrome.devtools.json' || req.url !== './/favicon.ico' ) {
    const rs1 = createReadStream(`./${req.url}`);
    rs1.pipe(res);

    rs1.on('error', (err) => {
        console.log(err);
    })
  }
});

httpClient.listen("4200");
