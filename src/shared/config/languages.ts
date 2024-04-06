import { LangEnIcon, LangRuIcon, LangUzIcon } from "@shared/assets";
import { Language } from "@shared/types/languages";

export enum languages {
  ru = "RU",
  en = "EN",
  uz = "UZ",
}

export const Languages: Language[] = [
  {
    name: languages.ru,
    id: 1,
    icon: LangRuIcon,
  },
  {
    name: languages.uz,
    id: 2,
    icon: LangUzIcon,
  },
  {
    name: languages.en,
    id: 3,
    icon: LangEnIcon,
  },
];
