const triggerBlobDownload = (blobUrl: string, filename: string) => {
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(blobUrl);
};

export const downloadFileOnDevice = async (url: string, filename: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  triggerBlobDownload(window.URL.createObjectURL(blob), filename);
};

export const downloadBlobOnDevice = (blob: Blob, filename: string) => {
  triggerBlobDownload(window.URL.createObjectURL(blob), filename);
};
