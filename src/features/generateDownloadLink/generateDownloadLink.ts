export const GenerateDownloadLink = (file: File | string, fileName: string) => {
  if (typeof file === "string") {
    fetch(file)
      .then((response) => response.blob())
      .then((blob) => {
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(downloadUrl);
      })
      .catch((err) => console.error("Error downloading the file", err));
  } else {
    const downloadUrl = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(downloadUrl);
  }
};
