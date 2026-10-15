/** Предпросмотр скидки: корзина и экран оплаты отвечают одинаково */
export interface IPromocodeDiscount {
  amount_before: number;
  discount_amount: number;
  amount_after: number;
}

export interface ICheckPaymentPromocodeRequest {
  project_id: string;
  promocode: string;
}
