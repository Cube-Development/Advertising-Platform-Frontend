export enum languages {
  ru = "RU",
  en = "EN",
  uz = "UZ",
}

export enum languagesNum {
  ru = 1,
  uz = 2,
  en = 3,
}

export const Languages: Language[] = [
  {
    name: languages.ru,
    id: languagesNum.ru,
    icon: "russia",
  },
  {
    name: languages.uz,
    id: languagesNum.uz,
    icon: "uzbekistan",
  },
  {
    name: languages.en,
    id: languagesNum.en,
    icon: "uk",
  },
];

export interface Language {
  name: languages;
  id: languagesNum;
  // icon: FC;
  icon: string;
}
