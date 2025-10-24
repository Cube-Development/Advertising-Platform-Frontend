import { IPostData } from "@entities/project";
import { downloadFile } from "@shared/utils";

export const downloadAllFiles = async (files: IPostData[]) => {
  const promises: Promise<File>[] = files.map((file) =>
    downloadFile(file.url || "", file.content),
  );
  return await Promise.all(promises);
};
