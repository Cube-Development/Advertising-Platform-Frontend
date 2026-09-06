export interface IWalletHistory {
  id: string;
  transaction_datetime: string;
  transaction_type: string;
  way_type: string;
  amount: number;
  status: string;
  qr_code_url?: string;
}
