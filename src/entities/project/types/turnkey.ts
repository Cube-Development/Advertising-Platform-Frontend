import { ENUM_WALLETS_TYPE } from "@entities/wallet";
import { TariffIndex } from "../config";

export interface IBuyTariff {
  tariff_ident: TariffIndex;
  comment: string;
  links: string[];
  attached_files: IAttachedFiles[];
  wallet_type: ENUM_WALLETS_TYPE | null;
}

interface IAttachedFiles {
  content: string;
  name: string;
  content_type: number;
}
