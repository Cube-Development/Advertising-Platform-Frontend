import { platformTypesStr } from "@entities/platform";

export enum EGenerationLanguage {
  ru = "ru",
  uz = "uz",
}

export interface IGeneratePostRequest {
  business_name: string;
  niche: string;
  offer?: string | null;
  link?: string | null;
  platform?: platformTypesStr;
  language: EGenerationLanguage;
}

export interface IGenerationLanguageOption {
  value: EGenerationLanguage;
  labelKey: string;
}

export interface IGenerationStreamHandlers {
  onChunk: (chunk: string) => void;
  onDone?: () => void;
  onError?: (error: Error) => void;
  signal?: AbortSignal;
}
