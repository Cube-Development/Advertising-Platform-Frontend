import { IPostData } from "@entities/project";
import { downloadFile } from "@shared/utils";

export const downloadAllFiles = async (files: IPostData[]) => {
  const promises: Promise<File>[] = files.map(
    (file) => downloadFile(file.content || "", file.name || ""),
    // downloadFile(file.url || "", file.name || ""),
  );
  return await Promise.all(promises);
};
