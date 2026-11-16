/** Предпросмотр скидки: корзина и экран оплаты отвечают одинаково */
export interface IPromocodeDiscount {
  amount_before: number;
  discount_amount: number;
  amount_after: number;
}

/** Проверка кода по проекту: корзина сохранённого проекта и экран оплаты */
export interface ICheckProjectPromocodeRequest {
  project_id: string;
  promocode: string;
}

/**
 * Код и корзина, к которой он привязан:
 * `projectId` — сохранённый проект или проект на оплате, `null` — общая корзина
 */
export interface IPromocodeTarget {
  code: string;
  projectId: string | null;
}

/** Применённый промокод: пустой — `code: null` */
export interface IPromocodeState {
  code: string | null;
  projectId: string | null;
  discount: IPromocodeDiscount | null;
  /**
   * Идёт «Применить»: запишется ответ только последнего начатого применения.
   * В sessionStorage не хранится — после перезагрузки ждать нечего
   */
  applyId: string | null;
}
