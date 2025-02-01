export enum languages {
  uz = "UZ",
  en = "EN",
  ru = "RU",
  kr = "KR",
}

export enum languagesNum {
  uz = 1,
  en = 2,
  ru = 3,
  kr = 4,
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

export const ChannelLanguages: Language[] = [
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
  {
    name: languages.kr,
    id: languagesNum.kr,
    icon: "kr",
  },
];

export interface Language {
  name: languages;
  id: languagesNum;
  // icon: FC;
  icon: string;
}
