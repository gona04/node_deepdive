import { fetchJson } from "../../../shared/api/fetchJson";
import type { FilesAndFoldersResponse } from "../types/filesAndFolders";

export const filesUrl = "/files";

export const getFilesAndFolders = () => {
  return fetchJson<FilesAndFoldersResponse>(filesUrl);
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return fetchJson(`${filesUrl}/upload`, {
    method: "POST",
    body: formData,
  });
};