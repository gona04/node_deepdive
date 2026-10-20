import express from "express";
import { downloadFiles, getFilesAndFolders, previewFiles } from "../controller/fileAccessController.js";
import { fileURLToPath } from "node:url";

const app = express();

app.get("/", getFilesAndFolders);

app.get("/download/:fileName", downloadFiles);

app.get("/preview/:fileName", previewFiles);

const publicDirectory = fileURLToPath(new URL("../public/", import.meta.url));
app.use(express.static(publicDirectory));

export default app;
