import { TarifIndex } from "../config";

export interface IBuyTarif {
  tariff_ident: TarifIndex;
  comment: string;
  links: string[];
  attached_files: IAttachedFiles[];
}

interface IAttachedFiles {
  content: string;
  name: string;
  content_type: number;
}
