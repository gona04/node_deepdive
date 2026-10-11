export function dnsHeader(id, qr, opcode, aa, tc, rd, ra, z, rcode, qdcount, ancount, nscount, arcount) {
    const header = Buffer.alloc(12);

    const flags = qr | opcode | aa | tc | rd | ra | z | rcode
    header.writeInt16BE(id, 0);
    header.writeInt16BE(flags, 2);
   
    header.writeInt16BE(qdcount, 4);
    header.writeInt16BE(ancount, 6);
    header.writeInt16BE(nscount, 8);
    header.writeInt16BE(arcount, 10)


    return header;
}