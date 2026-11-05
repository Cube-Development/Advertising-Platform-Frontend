/** "2026-09-16" или "2026-09-16T08:24:00" → "16.09.2026" */
export const formatReportDate = (value?: string | null) => {
  if (!value) return "";
  const [y, m, d] = value.slice(0, 10).split("-");
  return y && m && d ? `${d}.${m}.${y}` : value;
};

/** "08:24:00" или ISO с временем → "08:24" */
export const formatReportTime = (value?: string | null) => {
  if (!value) return "";
  const time = value.includes("T") ? value.split("T")[1] : value;
  return time.slice(0, 5);
};

/** Внешняя ссылка: пустая → undefined, без протокола ("t.me/x") → https:// */
export const toExternalUrl = (value?: string | null) => {
  const url = value?.trim();
  if (!url) return undefined;
  return /^[a-z][a-z\d+.-]*:/i.test(url) ? url : `https://${url}`;
};

/** ISO → "03.11.2026 17:51" */
export const formatReportDateTime = (value?: string | null) =>
  `${formatReportDate(value)} ${formatReportTime(value)}`.trim();
