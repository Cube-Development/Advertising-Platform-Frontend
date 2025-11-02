import { IDownloadFileType } from "@entities/project";
import { DownloadCompleteIcon, DownloadIcon } from "@shared/assets";
import { formatFileSizeFromType, MyProgressBar, sizeTypes } from "@shared/ui";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";

interface FileDownloaderProps {
  file: IDownloadFileType;
  onChange: (currntSize: any, fileUrl: string) => void;
}

export const FileDownloader: FC<FileDownloaderProps> = ({ file, onChange }) => {
  const defaultName = "File";
  const [progress, setProgress] = useState<number>(0);
  const [onStart, setOnStart] = useState<boolean>(false);
  const [fileSize, setFileSize] = useState<number>(0);

  const contentTypeToExtension: Record<string, string> = {
    "application/pdf": ".pdf",
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      ".docx",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      ".xlsx",
    "text/plain": ".txt",
    "application/zip": ".zip",
  };

  const downloadFile = async () => {
    try {
      setOnStart(true);
      const response = await axios.get(file.content, {
        responseType: "blob", // или 'arraybuffer' для бинарных данных
        onDownloadProgress: (progressEvent) => {
          setFileSize(progressEvent.total || 0);
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total!,
          );
          setProgress(percentCompleted); // Обновляем прогресс
        },
      });

      let filename = file.fileName || defaultName;
      const contentType = response.headers["content-type"];
      const extension = contentTypeToExtension[contentType] || ""; // Получение расширения или пустая строка
      if (file.fileType && !filename.endsWith(extension)) {
        filename += extension; // Добавление расширения, если его нет в имени файла
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename); // Использование извлеченного имени файла
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Ошибка загрузки файла:", error);
    }
  };

  useEffect(() => {
    const currentSize = (fileSize * progress) / 100;
    const currentSizeString = formatFileSizeFromType(
      currentSize,
      file.sizeType || sizeTypes.kbytes,
    );
    onChange(currentSizeString, file.content);
  }, [progress]);

  return (
    <div className={styles.wrapper}>
      {!onStart ? (
        <button onClick={downloadFile}>
          <DownloadIcon />
        </button>
      ) : progress !== 100 ? (
        <MyProgressBar progress={progress} />
      ) : (
        <DownloadCompleteIcon />
      )}
    </div>
  );
};
