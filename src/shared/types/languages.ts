import { languages } from "@shared/config/languages";
import { FC } from "react";

export interface Language {
  name: languages;
  id: number;
  // icon: FC;
  icon: string;
}
