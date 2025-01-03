export interface IOrderFeature {
  order_id?: string;
  date?: string;
  url?: string;
  dates?: {
    date_from: string;
    date_to: string;
  };
}
