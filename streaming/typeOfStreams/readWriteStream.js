import fs from "node:fs";
import fsPromises from "node:fs/promises";

import { calculatePercentage } from "../utils/calculatePercentage.js";

const COLORS = {
  GREEN: "\x1b[32m",
  YELLOW: "\x1b[33m",
  RESET: "\x1b[0m",
};

const CHUNK_SIZE = 4;

/**
 * Copies a file using Node.js readable and writable streams.
 *
 * Responsible for coordinating the file-copy operation:
 * obtaining file metadata, creating streams, tracking progress,
 * and initiating the copy.
 *
 * @param {string} toGet - Path of the source file.
 * @param {string} toSave - Path of the destination file.
 * @returns {Promise<void>} Resolves when the copy operation completes.
 */
export async function readWriteUsingReadStream(toGet, toSave) {
  const totalSize = await getFileSize(toGet);

  const { readStream, writeStream } = createStreams(toGet, toSave);

  await copyStream(readStream, writeStream, totalSize);
}

/**
 * Gets the size of a file.
 *
 * @param {string} filePath - Path of the file.
 * @returns {Promise<number>} File size in bytes.
 */
async function getFileSize(filePath) {
  const { size } = await fsPromises.stat(filePath);

  return size;
}

/**
 * Creates the readable and writable streams required for the copy.
 *
 * @param {string} sourcePath - Source file path.
 * @param {string} destinationPath - Destination file path.
 * @returns {{
 *   readStream: import("node:fs").ReadStream,
 *   writeStream: import("node:fs").WriteStream
 * }}
 */
function createStreams(sourcePath, destinationPath) {
  const readStream = fs.createReadStream(sourcePath, {
    highWaterMark: CHUNK_SIZE,
  });

  const writeStream = fs.createWriteStream(destinationPath);

  return {
    readStream,
    writeStream,
  };
}

/**
 * Copies data from the readable stream to the writable stream
 * while tracking the copy progress.
 *
 * @param {import("node:fs").ReadStream} readStream
 * @param {import("node:fs").WriteStream} writeStream
 * @param {number} totalSize - Total source file size in bytes.
 * @returns {Promise<void>} Resolves when writing is complete.
 */
function copyStream(readStream, writeStream, totalSize) {
  return new Promise((resolve, reject) => {
    console.time("CopyProcessTime");
    let loadedBytes = 0;
    let loadedChunks = 0;
    let readCount = 0;
    readStream.on("data", (chunk) => {
      readCount++;
      loadedBytes += chunk.length;
      loadedChunks++;

      const percentage = calculatePercentage(loadedBytes, totalSize);

      console.log(chunk.toString());

      console.log(
        `${COLORS.GREEN}${percentage.toFixed(2)}% executed${COLORS.RESET}`,
      );
      if(readCount == 1) {
        fs.writeFileSync("text-two.txt", chunk.toString())
      } else {
          //   writeStream.write(chunk);
          fs.appendFileSync("text-two.txt", chunk.toString());
      }

      readStream.pause();

      setTimeout(() => {
        readStream.resume();
      }, 50);
    });

    readStream.on("end", () => {
      writeStream.end();
    });

    writeStream.on("finish", () => {
      console.log(
        `${COLORS.YELLOW}In total ${loadedChunks} chunks were loaded${COLORS.RESET}`,
      );
      console.timeEnd("CopyProcessTime");
      resolve();
    });

    readStream.on("error", reject);
    writeStream.on("error", reject);
  });
}
