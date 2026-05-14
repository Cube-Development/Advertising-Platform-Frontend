import type { ComponentType, SVGProps } from "react";

export interface Category {
  id: string;
  name: string;
  Icon: ComponentType<SVGProps<SVGSVGElement> & { size?: number }>;
  tint: string;
  channels: number;
  avgViewsMln: number;
}

export interface ConfiguratorState {
  activeCategoryIdx: number;
  budget: number;
  accordionOpen: boolean;
  region: string;
  language: string;
  age: string;
  gender: string;
  search: string;
}

/** Плоская схема для react-hook-form */
export interface ConfiguratorFormValues {
  categoryIdx: number | null;
  budget: number;
  region: number[]; // массив ID регионов
  language: number[]; // массив ID языков
}
