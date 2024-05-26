export function getFileExtension(file: File): string {
  const fileName = file.name;
  const lastDotIndex = fileName.lastIndexOf(".");
  return lastDotIndex !== -1
    ? fileName.slice(lastDotIndex + 1).toLowerCase()
    : "";
}
