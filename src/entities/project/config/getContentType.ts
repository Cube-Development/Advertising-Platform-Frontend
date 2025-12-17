import { ContentType } from "@entities/project";

export const getContentType = (file: File): ContentType => {
  const mimeType = file.type;

  if (mimeType.startsWith("image/gif")) {
    return ContentType.gif;
  } else if (mimeType.startsWith("image/")) {
    return ContentType.photo;
  } else if (mimeType.startsWith("video/")) {
    return ContentType.video;
  } else {
    return ContentType.file;
  }
};
