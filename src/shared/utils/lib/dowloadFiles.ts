export async function downloadFile(
  url: string,
  fileName: string,
): Promise<File> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${response.statusText}`);
  }

  const blob = await response.blob();
  const file = new File([blob], fileName, { type: blob.type });
  return file;
}
