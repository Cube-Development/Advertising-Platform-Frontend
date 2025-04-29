import { ENUM_LANGUAGES, ENUM_LANGUAGES_NUM } from "./enum";
import { ILanguage } from "./types";

export const USER_LANGUAGES_LIST: ILanguage[] = [
  {
    name: ENUM_LANGUAGES.RU,
    id: ENUM_LANGUAGES_NUM.RU,
    icon: "russia",
  },
  {
    name: ENUM_LANGUAGES.UZ,
    id: ENUM_LANGUAGES_NUM.UZ,
    icon: "uzbekistan",
  },
  {
    name: ENUM_LANGUAGES.EN,
    id: ENUM_LANGUAGES_NUM.EN,
    icon: "uk",
  },
];

export const CHANNEL_LANGUAGES_LIST: ILanguage[] = [
  {
    name: ENUM_LANGUAGES.RU,
    id: ENUM_LANGUAGES_NUM.RU,
    icon: "russia",
  },
  {
    name: ENUM_LANGUAGES.UZ,
    id: ENUM_LANGUAGES_NUM.UZ,
    icon: "uzbekistan",
  },
  {
    name: ENUM_LANGUAGES.EN,
    id: ENUM_LANGUAGES_NUM.EN,
    icon: "uk",
  },
  {
    name: ENUM_LANGUAGES.KR,
    id: ENUM_LANGUAGES_NUM.KR,
    icon: "kr",
  },
];
