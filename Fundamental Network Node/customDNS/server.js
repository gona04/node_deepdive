import dgram from "dgram";
import { dnsHeader } from "./header.js";

const defaultHeader = dnsHeader(1234, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

const socket = dgram.createSocket("udp4");

socket.bind(2053);

socket.on("message", (message, rinfo) => {
    console.log(message.toString('utf-8'));
    console.log(rinfo.port, rinfo.address);
    let header =  Buffer.from(defaultHeader);
    let msgRes = Buffer.from(message);
    const response = Buffer.concat([header, msgRes]);
    socket.send(response, rinfo.port, rinfo.address, (err) => {
        console.log(err);
    });
});
