export interface ICommonObserveItem {
  date: string;
  projects: number;
  common_orders: number;
  publisher_orders: number;
  self_connect_orders: number;
  turnover: number;
}

export interface ICommonObserveTotals {
  projects: number;
  common_orders: number;
  publisher_orders: number;
  self_connect_orders: number;
  turnover: number;
}

export interface ICommonObserveResponse {
  data: ICommonObserveItem[];
  totals: ICommonObserveTotals;
}

export interface ICommonObserveReq {
  date_from: string;
  date_to: string;
}
