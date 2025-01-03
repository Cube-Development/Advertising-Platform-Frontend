// import { IFile } from "@entities/project";
// import { generateDownloadLinkWithProgress } from "@shared/utils/lib";
// import { useState, useCallback } from "react";

// interface UseFileDownloaderResult {
//   downloadAllFiles: () => Promise<void>;
//   isAllDownloading: boolean;
//   progress: number;
// }

// type FileInput = string | File | IFile;

// export const useFileDownloader = (
//   files: FileInput[]
// ): UseFileDownloaderResult => {
//   const [isAllDownloading, setIsAllDownloading] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const downloadAllFiles = useCallback(async () => {
//     if (isAllDownloading) return;
//     setIsAllDownloading(true);
//     const totalFiles = files.length;
//     let cumulativeProgress = 0;

//     for (const [index, file] of files.entries()) {
//       const fileContent =
//         typeof file === "string" || file instanceof File
//           ? file
//           : (file as IFile)?.content;
//       const fileName = `file_${index}_${Math.random()}`;

//       if (!fileContent) {
//         console.warn(`Файл ${fileName} не может быть загружен.`);
//         continue;
//       }

//       try {
//         await generateDownloadLinkWithProgress(
//           fileContent,
//           fileName,
//           (fileProgress) => {
//             cumulativeProgress =
//               cumulativeProgress -
//               cumulativeProgress / totalFiles +
//               fileProgress / totalFiles;
//             setProgress(Math.round(cumulativeProgress));
//           }
//         );
//       } catch (error) {
//         console.error(`Ошибка при загрузке файла ${fileName}:`, error);
//       }
//     }

//     setIsAllDownloading(false);
//   }, [files, isAllDownloading]);

//   return { downloadAllFiles, isAllDownloading, progress };
// };

// import { IFile } from "@entities/project";
// import { useState, useCallback } from "react";
// import JSZip from "jszip";
// import { saveAs } from "file-saver";

// interface UseFileDownloaderResult {
//   downloadAllFiles: () => Promise<void>;
//   isAllDownloading: boolean;
//   progress: number;
// }

// type FileInput = string | File | IFile;

// export const useFileDownloader = (
//   files: FileInput[]
// ): UseFileDownloaderResult => {
//   const [isAllDownloading, setIsAllDownloading] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const downloadAllFiles = useCallback(async () => {
//     if (isAllDownloading) return; // Предотвращаем повторный запуск, пока идет загрузка
//     setIsAllDownloading(true);
//     const totalFiles = files.length;
//     let cumulativeProgress = 0;

//     const zip = new JSZip(); // Инициализация нового zip файла

//     // Загружаем данные для каждого файла
//     for (const [index, file] of files.entries()) {
//       const fileContent =
//         typeof file === "string" || file instanceof File
//           ? file
//           : (file as IFile)?.content;
//       const fileName = `file_${index}_${Math.random()}`;

//       if (!fileContent) {
//         console.warn(`Файл ${fileName} не может быть загружен.`);
//         continue;
//       }

//       try {
//         let fileBlob: Blob;

//         // Если файл это URL, загружаем его через fetch
//         if (typeof fileContent === "string") {
//           const response = await fetch(fileContent);
//           fileBlob = await response.blob();
//         }
//         // Если файл это обычный объект File (например, image/video), просто передаем его
//         else if (fileContent instanceof File) {
//           fileBlob = fileContent;
//         } else {
//           // В случае других типов, можно попробовать конвертировать в Blob
//           fileBlob = new Blob([fileContent], {
//             type: "application/octet-stream",
//           });
//         }

//         // Добавляем файл в архив
//         zip.file(fileName, fileBlob);

//         // Обновляем прогресс
//         cumulativeProgress = ((index + 1) / totalFiles) * 100;
//         setProgress(Math.round(cumulativeProgress));
//       } catch (error) {
//         console.error(`Ошибка при обработке файла ${fileName}:`, error);
//       }
//     }

//     // Когда все файлы собраны, генерируем zip
//     zip.generateAsync({ type: "blob" }).then((content) => {
//       saveAs(content, "files.zip"); // Скачиваем готовый zip архив
//       setIsAllDownloading(false); // Завершаем процесс
//     });
//   }, [files, isAllDownloading]);

//   return { downloadAllFiles, isAllDownloading, progress };
// };

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
    if (isAllDownloading) return; // Предотвращаем повторный запуск, пока идет загрузка
    setIsAllDownloading(true);
    const totalFiles = files.length;
    let cumulativeProgress = 0;

    const zip = new JSZip(); // Инициализация нового zip файла

    // Загружаем данные для каждого файла
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

        // Если файл это URL, загружаем его через fetch
        if (typeof fileContent === "string") {
          const response = await fetch(fileContent);
          fileBlob = await response.blob();

          // Получаем тип содержимого из заголовков и преобразуем в расширение
          const contentType = response.headers.get("Content-Type");
          fileExtension =
            contentTypeToExtension[contentType ? contentType : ""] || "";
        }
        // Если файл это обычный объект File (например, image/video), просто передаем его
        else if (fileContent instanceof File) {
          fileBlob = fileContent;
          fileExtension = fileContent.name.split(".").pop() || "";
        } else {
          // В случае других типов, можно попробовать конвертировать в Blob
          fileBlob = new Blob([fileContent], {
            type: "application/octet-stream",
          });
        }

        // Присваиваем расширение к имени файла, если оно определено
        if (fileExtension && !fileName.endsWith(fileExtension)) {
          fileName = `${fileName}.${fileExtension}`;
        }

        // Добавляем файл в архив
        zip.file(fileName, fileBlob);

        // Обновляем прогресс
        cumulativeProgress = ((index + 1) / totalFiles) * 100;
        setProgress(Math.round(cumulativeProgress));
      } catch (error) {
        console.error(`Ошибка при обработке файла ${fileName}:`, error);
      }
    }

    // Когда все файлы собраны, генерируем zip
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "files.zip"); // Скачиваем готовый zip архив
      setIsAllDownloading(false); // Завершаем процесс
    });
  }, [files, isAllDownloading]);

  return { downloadAllFiles, isAllDownloading, progress };
};
