import { dateSortingTypes } from "@entities/platform";
import { ENUM_LANGUAGES_NUM } from "@shared/languages";
import { IWalletHistory } from "./history";

export interface IHistoryRequest {
  language: ENUM_LANGUAGES_NUM;
  page: number;
  date_sort: dateSortingTypes;
  elements_on_page?: number;
}

export interface IHistoryResponse {
  page: number;
  elements: number;
  transactions: IWalletHistory[];
  isLast?: boolean;
}
