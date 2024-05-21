export const GenerateDownloadLink = (
  file: File | string,
  fileName?: string,
) => {
  if (typeof file === "string") {
    const a = document.createElement("a");
    a.href = file;
    a.download = fileName ?? "downloaded_file";
    a.click();
  } else {
    const downloadLink = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = downloadLink;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(downloadLink);
  }
};
