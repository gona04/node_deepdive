import { useEffect, useState } from "react";
import { getFilesAndFolders } from "../api/filesAndFoldersApi";

export const useFilesAndFolders = () => {
  const [files, setFiles] = useState<
    { name: string; type: "directory" | "file" }[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

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

  return {
    files,
    error,
    loading,
    refreshFiles: () => setRefreshKey((key) => key + 1),
  };
};
