import { randomUUID } from "node:crypto";
import multer from "multer";
import path from "node:path";
import { publicDirectory } from "../../model/fileAccessModel.js";

const upload = multer({
  storage: multer.diskStorage({
    destination: publicDirectory,
    filename: (_req, file, callback) => {
      const safeName =
        path
          .basename(file.originalname.replaceAll("\\", "/"))
          .replace(/[^\p{L}\p{N}._-]/gu, "_")
          .slice(0, 180) || "upload";
      callback(null, `${randomUUID()}-${safeName}`);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 1024,
    files: 1,
  },
});

export const parseFileUpload = (req, res, next) => {
  upload.single("file")(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      const status = error.code === "LIMIT_FILE_SIZE" ? 413 : 400;
      return res.status(status).json({ error: error.message });
    }
    if (error) return next(error);
    next();
  });
};
