import { contentTypeToExtension } from "@shared/types";

export const generateDownloadLinkWithProgress = async (
  file: File | string,
  fileName: string,
  onProgress: (progress: number) => void,
) => {
  if (typeof file === "string") {
    try {
      const response = await fetch(file);

      if (!response.ok) {
        throw new Error(`Ошибка загрузки файла: ${response.statusText}`);
      }

      // Получаем тип содержимого
      const contentType = response.headers.get("Content-Type");
      const extension =
        contentTypeToExtension[contentType ? contentType : ""] || "";

      // Получаем длину содержимого
      const contentLength = response.headers.get("content-length");
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      let loaded = 0;

      const reader = response.body?.getReader();
      const chunks = [];

      while (true) {
        const { done, value } = await reader!.read();

        if (done) break;

        chunks.push(value);
        loaded += value.length;

        // Обновляем прогресс
        onProgress((loaded / total) * 100);
      }

      const blob = new Blob(chunks);
      const downloadUrl = URL.createObjectURL(blob);

      // Устанавливаем правильное имя файла с расширением
      const finalFileName =
        extension && !fileName.endsWith(extension)
          ? `${fileName}${extension}`
          : fileName;

      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = finalFileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      console.error("Ошибка при загрузке файла", err);
    }
  } else if (file instanceof File) {
    const downloadUrl = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(downloadUrl);
    onProgress(100); // Локальный файл мгновенно "скачан"
  }
};
