import {
  getFilesAndFolders,
  publicDirectory,
} from "../model/fileAccessModel.js";

export const listFilesAndFolders = async (req, res) => {
  res.json({
    data: await getFilesAndFolders(),
  });
};

export const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Choose a file to upload." });
  }

  res.status(201).json({
    data: {
      name: req.file.filename,
      originalName: req.file.originalname,
      type: "file",
    },
  });
};

export const downloadFiles = (req, res, next) => {
  res.download(
    req.params.fileName,
    req.params.fileName,
    { root: publicDirectory },
    (error) => {
      if (error) next(error);
    },
  );
};

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
};