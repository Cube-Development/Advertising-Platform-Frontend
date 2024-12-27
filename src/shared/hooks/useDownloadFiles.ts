import { IFile } from "@entities/project";
import { generateDownloadLinkWithProgress } from "@shared/utils/lib";
import { useState, useCallback } from "react";

interface UseFileDownloaderResult {
  downloadAllFiles: () => Promise<void>;
  isAllDownloading: boolean;
  progress: number;
}

type FileInput = string | File | IFile;

export const useFileDownloader = (
  files: FileInput[],
): UseFileDownloaderResult => {
  const [isAllDownloading, setIsAllDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const downloadAllFiles = useCallback(async () => {
    if (isAllDownloading) return;
    setIsAllDownloading(true);
    const totalFiles = files.length;
    let cumulativeProgress = 0;

    for (const [index, file] of files.entries()) {
      const fileContent =
        typeof file === "string" || file instanceof File
          ? file
          : (file as IFile)?.content;
      const fileName = `file_${index}_${Math.random()}`;

      if (!fileContent) {
        console.warn(`Файл ${fileName} не может быть загружен.`);
        continue;
      }

      try {
        await generateDownloadLinkWithProgress(
          fileContent,
          fileName,
          (fileProgress) => {
            cumulativeProgress =
              cumulativeProgress -
              cumulativeProgress / totalFiles +
              fileProgress / totalFiles;
            setProgress(Math.round(cumulativeProgress));
          },
        );
      } catch (error) {
        console.error(`Ошибка при загрузке файла ${fileName}:`, error);
      }
    }

    setIsAllDownloading(false);
  }, [files, isAllDownloading]);

  return { downloadAllFiles, isAllDownloading, progress };
};
