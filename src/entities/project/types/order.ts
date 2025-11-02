export interface IOrderFeature {
  order_id?: string;
  code?: number;
  project_id?: string;
  date?: string;
  url?: string;
  dates?: {
    date_from: string;
    date_to: string;
  };
  time?: string;
}
