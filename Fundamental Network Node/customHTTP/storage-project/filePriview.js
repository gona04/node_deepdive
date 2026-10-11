import { createReadStream } from "fs";
import path from "path";
import { getContentType } from "./getExtention.js";

export const serveFile = (filePath, res, download = false) => {
  const fileName = path.basename(filePath);
  const contentType = getContentType(filePath);

  res.setHeader("Content-Type", contentType);
    console.log(contentType);
  if (download) {
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileName}"`
    );
  } else {
    res.setHeader(
      "Content-Disposition",
      "inline"
    );
  }

  const stream = createReadStream(filePath);

  stream.pipe(res);

  stream.on("error", (error) => {
    console.error(error);

    if (!res.headersSent) {
      res.statusCode = 500;
    }

    res.end("Error reading file");
  });
}; 