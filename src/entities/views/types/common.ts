import { walletTypesFilter } from "@entities/wallet";

export interface IViewWallet {
  count: number;
  values: IWalletType[];
}

interface IWalletType {
  type: walletTypesFilter;
  count: number;
}
