import { ENUM_LANGUAGES } from "@shared/languages";

const RU_VIDEO_SRC = "https://www.youtube.com/watch?v=KmClRCDcQ1E";
const EN_VIDEO_SRC = "https://www.youtube.com/watch?v=NhnTrXxVz7M";
const UZ_VIDEO_SRC = "https://www.youtube.com/watch?v=NhnTrXxVz7M";
const KR_VIDEO_SRC = "https://www.youtube.com/watch?v=NhnTrXxVz7M";

export const MAIN_VIDEO_SRC: Record<ENUM_LANGUAGES, string> = {
  [ENUM_LANGUAGES.RU]: RU_VIDEO_SRC,
  [ENUM_LANGUAGES.EN]: EN_VIDEO_SRC,
  [ENUM_LANGUAGES.UZ]: UZ_VIDEO_SRC,
  [ENUM_LANGUAGES.KR]: KR_VIDEO_SRC,
};
