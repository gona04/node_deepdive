import { readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import fs from "fs/promises";

const publicDirectory = fileURLToPath(new URL("../public/", import.meta.url));

export const getFilesAndFolders = async (req, res) => {
  const entries = await readdir(publicDirectory, { withFileTypes: true });
  // const html = await setDynamicHTML(entries);
  res.json({data: entries});
}

export const downloadFiles = (req, res, next) => {
  res.download(
    req.params.fileName,
    req.params.fileName,
    { root: publicDirectory },
    (error) => {
      if (error) next(error);
    },
  );
}

export const previewFiles = (req, res, next) => {
  res.sendFile(
    req.params.fileName,
    {
      root: publicDirectory,
      headers: { "Content-Disposition": "inline" },
    },
    (error) => {
      if (error) next(error);
    },
  );
}

/* const setDynamicHTML = async (entries) => {
    let listOfFiles;
  let dynamicHTML = "";
  listOfFiles = entries.map((entry) => ({
    name: entry.name,
    type: entry.isDirectory() ? "folder" : entry.isFile() ? "file" : "other",
  }));

  listOfFiles.forEach((entry) => {
    if (entry.type === "file") {
      const encodedName = encodeURIComponent(entry.name);
      dynamicHTML += `<li><a href="/files/preview/${encodedName}" target="_blank" rel="noreferrer">${entry.name}</a> <a href="/files/download/${encodedName}">Download</a></li>`;
    } else if (entry.type === "folder") {
      dynamicHTML += `<li>${entry.name} (folder)</li>`;
    }
  });
  let html = (
    await fs.readFile(
      "/Users/workgoonja/Documents/Practice/Node/node_deep_dive/authorization/authentication-app/backend/index.html",
      "utf-8",
    )
  ).replace("${dynamicHTML}", dynamicHTML);

  return html;
} */