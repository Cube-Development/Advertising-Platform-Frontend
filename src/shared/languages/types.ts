import { ENUM_LANGUAGES, ENUM_LANGUAGES_NUM } from "./enum";

export interface ILanguage {
  name: ENUM_LANGUAGES;
  id: ENUM_LANGUAGES_NUM;
  icon: string;
}
