import { IBuyTariff } from "@entities/project";

export interface IBuyTariffForm extends IBuyTariff {
  url: string;
  files: File[];
  dragActive: boolean;
  isTarifBought: boolean;
  isHaveBalance: boolean;
  isDropFile: boolean;
  uploadProgress: { [key: string]: number };
}
