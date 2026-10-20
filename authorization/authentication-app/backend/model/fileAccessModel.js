import { readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

export const publicDirectory = fileURLToPath(new URL("../public/", import.meta.url));

export const getFilesAndFolders = async () => {
  const entries = await readdir(publicDirectory, { withFileTypes: true });
  return entries.map((entry) => ({
    name: entry.name,
    type: entry.isDirectory() ? "directory" : "file",
  }));
};
