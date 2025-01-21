import { IFile } from "@entities/project";
import { useState, useCallback } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { contentTypeToExtension } from "@shared/types"; // Импортируем словарь для расширений

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
    if (isAllDownloading) return; // Предотвращаем повторный запуск
    setIsAllDownloading(true);
    const totalFiles = files.length;
    const progressPerFile = 100 / totalFiles; // Доля прогресса для одного файла
    let cumulativeProgress = 0;

    const zip = new JSZip(); // Инициализация нового zip файла

    for (const [index, file] of files.entries()) {
      const fileContent =
        typeof file === "string" || file instanceof File
          ? file
          : (file as IFile)?.content;
      let fileName = `file_${index}_${Math.random()}`;

      if (!fileContent) {
        console.warn(`Файл ${fileName} не может быть загружен.`);
        continue;
      }

      try {
        let fileBlob: Blob;
        let fileExtension = ""; // По умолчанию пустое расширение

        if (typeof fileContent === "string") {
          const response = await fetch(fileContent);
          const contentType = response.headers.get("Content-Type");
          fileExtension =
            contentTypeToExtension[contentType ? contentType : ""] || "";

          const reader = response.body?.getReader();
          if (!reader) {
            throw new Error("Не удалось получить поток данных");
          }

          const totalSize = parseInt(
            response.headers.get("Content-Length") || "0",
            10,
          );
          let loadedSize = 0;
          const chunks: Uint8Array[] = [];

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            if (value) {
              chunks.push(value);
              loadedSize += value.length;

              // Расчёт прогресса для текущего файла
              const fileProgress = (loadedSize / totalSize) * progressPerFile;

              // Обновление общего прогресса
              setProgress(Math.round(cumulativeProgress + fileProgress));
            }
          }
          fileBlob = new Blob(chunks);
        } else if (fileContent instanceof File) {
          fileBlob = fileContent;
          fileExtension = fileContent.name.split(".").pop() || "";
        } else {
          fileBlob = new Blob([fileContent], {
            type: "application/octet-stream",
          });
        }

        if (fileExtension && !fileName.endsWith(fileExtension)) {
          fileName = `${fileName}.${fileExtension}`;
        }

        zip.file(fileName, fileBlob);

        // Обновляем общий прогресс после завершения загрузки файла
        cumulativeProgress += progressPerFile;
        setProgress(Math.round(cumulativeProgress));
      } catch (error) {
        console.error(`Ошибка при обработке файла ${fileName}:`, error);
      }
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "files.zip"); // Скачиваем готовый zip архив
      setIsAllDownloading(false); // Завершаем процесс
    });
  }, [files, isAllDownloading]);

  return { downloadAllFiles, isAllDownloading, progress };
};
