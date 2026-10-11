import fs, { open } from "fs/promises";
import http from "http";
import { serveFile } from "./filePriview.js";

const httpServer = http.createServer();

httpServer.on("request", async (req, res) => {
  if (req.url === "/") {
    iterateInsideFolder(res, req);
  } else if (
    req.url !== "/.well-known/appspecific/com.chrome.devtools.json" &&
    req.url !== "/favicon.ico"
  ) {
    const isDownload = req.url.startsWith("/download/");
    const requestedPath = isDownload
      ? req.url.slice("/download".length)
      : req.url;
    const filePath = `../../${decodeURIComponent(requestedPath)}`;
    const fileHandler = await open(filePath);
    const fileStats = await fileHandler.stat();
    if (!fileStats?.isDirectory()) {
      console.log(isDownload);
      await fileHandler.close();
      return serveFile(filePath, res, isDownload);
    } else {
      await fileHandler.close();
      iterateInsideFolder(res, req, fileStats);
    }
  }
});

const iterateInsideFolder = async (res, req, fileStats) => {
  let listOfFiles;

  if (fileStats?.isDirectory()) {
    listOfFiles = await fs.readdir(`../../${req.url}`, { withFileTypes: true });
  } else {
    listOfFiles = await fs.readdir("../../customHTTP", { withFileTypes: true });
  }

  let dynamicHTML = "";
  listOfFiles = listOfFiles.filter((entry) => entry.name !== ".DS_Store");

  listOfFiles.forEach((entry) => {
    const currentPath = fileStats?.isDirectory()
      ? `${req.url}/${entry.name}`
      : `/customHTTP/${entry.name}`;
    const actions = entry.isDirectory()
      ? ""
      : ` <a href="${currentPath}">Preview</a> <a href="/download${currentPath}">Download</a>`;
    dynamicHTML += `<li><a href="${currentPath}">${entry.name}</a>${actions}</li>`;
  });
  let html = (await fs.readFile("./boilerplate.html", "utf-8")).replace(
    "${dynamicHTML}",
    dynamicHTML,
  );

  res.end(html);
};

httpServer.listen("2000");
