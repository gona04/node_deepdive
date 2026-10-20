import express from "express";
import {
  downloadFiles,
  listFilesAndFolders,
  previewFiles,
  uploadFile,
} from "../controller/fileAccessController.js";
import { parseFileUpload } from "../controller/middleware/uploadFile.js";
import { publicDirectory } from "../model/fileAccessModel.js";

const router = express.Router();

router.get("/", listFilesAndFolders);

router.post("/upload", parseFileUpload, uploadFile);

router.get("/download/:fileName", downloadFiles);

router.get("/preview/:fileName", previewFiles);

router.use(express.static(publicDirectory));

export default router;
