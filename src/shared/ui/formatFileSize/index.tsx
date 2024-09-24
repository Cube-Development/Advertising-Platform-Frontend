export enum sizeTypes {
  mbytes = "MB",
  kbytes = "KB",
  bytes = "bytes",
}

export const formatFileSize = (sizeInBytes: number): string => {
  if (sizeInBytes >= 1024 * 1024) {
    return (sizeInBytes / (1024 * 1024)).toFixed(2) + " " + sizeTypes.mbytes;
  } else if (sizeInBytes >= 1024) {
    return (sizeInBytes / 1024).toFixed(2) + " " + sizeTypes.kbytes;
  } else {
    return sizeInBytes + " " + sizeTypes.bytes;
  }
};

export const formatFileSizeAndType = (
  sizeInBytes: number,
): [string, sizeTypes] => {
  if (sizeInBytes >= 1024 * 1024) {
    return [(sizeInBytes / (1024 * 1024)).toFixed(2), sizeTypes.mbytes];
  } else if (sizeInBytes >= 1024) {
    return [(sizeInBytes / 1024).toFixed(2), sizeTypes.kbytes];
  } else {
    return [sizeInBytes.toString(), sizeTypes.bytes];
  }
};

export const formatFileSizeFromType = (
  sizeInBytes: number,
  sizeType: sizeTypes,
): string => {
  if (sizeType === sizeTypes.mbytes) {
    return (sizeInBytes / (1024 * 1024)).toFixed(2);
  } else if (sizeType === sizeTypes.kbytes) {
    return (sizeInBytes / 1024).toFixed(2);
  } else {
    return sizeInBytes.toString();
  }
};
