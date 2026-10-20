import { useEffect, useState, type FormEvent } from "react";
import { getFilesAndFolders } from "../api/filesAndFoldersApi";
import { uploadFile } from "../api/filesAndFoldersApi";

export const useFilesAndFolders = () => {
  const [files, setFiles] = useState<
    { name: string; type: "directory" | "file" }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    const getFiles = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getFilesAndFolders();
        setFiles(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load files");
      } finally {
        setLoading(false);
      }
    };

    void getFiles();
  }, [refreshKey]);

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const file = form.elements.namedItem("file");
    if (!(file instanceof HTMLInputElement) || !file.files?.[0]) {
      setUploadError("Choose a file to upload.");
      return;
    }

    setUploading(true);
    setUploadError(null);
    try {
      await uploadFile(file.files[0]);
      form.reset();
      refreshFiles();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const refreshFiles = () => setRefreshKey((key) => key + 1);

  return {
    files,
    error,
    loading,
    refreshFiles,
    handleUpload,
    uploading,
    uploadError
  };
};
