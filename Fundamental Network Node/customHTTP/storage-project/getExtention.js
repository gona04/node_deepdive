import path from 'path';

export const getContentType = (filePath) => {
  const extension = path.extname(filePath).toLowerCase();

  const types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".json": "application/json",
    ".txt": "text/plain",

    ".pdf": "application/pdf",

    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",

    ".mp4": "video/mp4",
    ".mp3": "audio/mpeg",

    ".zip": "application/zip",
  };

  return types[extension] || "application/octet-stream";
};