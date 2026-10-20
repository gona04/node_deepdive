import { filesUrl } from "../api/filesAndFoldersApi";
import { useFilesAndFolders } from "../hooks/useFilesAndFolders";

export function FilesAndFolders() {
  const { files, loading, error, uploading, handleUpload, uploadError } =
    useFilesAndFolders();

  if (loading) return <div>Loading files...</div>;
  if (error) return <div role="alert">Could not load files: {error}</div>;

  return (
    <div>
      <h1>List of files:</h1>
      <form onSubmit={handleUpload}>
        <label htmlFor="file">Choose a file (up to 1 GB):</label>
        <input id="file" name="file" type="file" required />
        <button type="submit" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {uploadError && <p role="alert">{uploadError}</p>}
      </form>
      <ul>
        {files.map((file) => (
          <li key={file.name}>
            {file.type === "file" ? (
              <>
                <span>{file.name} </span>
                <a
                  href={`${filesUrl}/preview/${encodeURIComponent(file.name)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Preview
                </a>
                {" | "}
                <a
                  href={`${filesUrl}/download/${encodeURIComponent(file.name)}`}
                  download
                >
                  Download
                </a>
              </>
            ) : (
              file.name
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
