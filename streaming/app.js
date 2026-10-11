import { readWriteUsingReadStream } from "./typeOfStreams/readWriteStream.js";

await readWriteUsingReadStream('./text.txt', './text-two.txt')