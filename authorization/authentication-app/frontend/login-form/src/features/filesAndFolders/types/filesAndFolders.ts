export type FilesAndFoldersResponse = {
  data: { name: string; type: "directory" | "file" }[];
};
