import { EGenerationLanguage, IGenerationLanguageOption } from "../types";

export const GENERATION_LANGUAGES: IGenerationLanguageOption[] = [
  {
    value: EGenerationLanguage.ru,
    labelKey: "create_order.generation.languages.ru",
  },
  {
    value: EGenerationLanguage.uz,
    labelKey: "create_order.generation.languages.uz",
  },
];

export const DEFAULT_GENERATION_LANGUAGE = EGenerationLanguage.ru;
