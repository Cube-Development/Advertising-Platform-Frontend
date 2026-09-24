const INVALID_FILENAME_CHARS = /[\\/:*?"<>|]/g;

export const getReportDownloadFileName = (fileName?: string | null): string => {
  const base = (fileName?.trim() || "report").replace(INVALID_FILENAME_CHARS, "_");
  return /\.xlsx$/i.test(base) ? base : `${base}.xlsx`;
};
