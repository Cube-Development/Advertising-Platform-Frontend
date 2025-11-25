export async function downloadFile(
  content: string,
  name: string,
): Promise<File> {
  const response = await fetch(content);
  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${response.statusText}`);
  }

  const blob = await response.blob();
  const file = new File([blob], name, { type: blob.type });
  return file;
}
