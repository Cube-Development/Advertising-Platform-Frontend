import { ICreateDate, IDatetime, IPostChannel } from "@entities/project";
import { platformTypesNum } from "@entities/platform";

/**
 * Находит текущую карточку ордера в datetime.orders по order_id.
 * Если не найдена — создаёт дефолтную из card.
 */
export const getCardData = (
  datetime: ICreateDate,
  card: IPostChannel,
): { currentCard: IDatetime; cardsWithoutCurrent: IDatetime[] } => {
  const currentCard: IDatetime = (datetime?.orders || []).find(
    (item) => item.order_id === card.id,
  ) || {
    order_id: card?.id,
    time_from: card?.time_from,
    time_to: card?.time_to,
    date: card?.date,
    date_from: card?.date_from,
    date_to: card?.date_to,
  };
  const cardsWithoutCurrent = (datetime.orders || []).filter(
    (item) => item.order_id !== card.id,
  );
  return { currentCard, cardsWithoutCurrent };
};

/**
 * Вычислить новый datetime-стейт после смены времени.
 */
export const buildDatetimeAfterTimeChange = (
  datetime: ICreateDate,
  card: IPostChannel,
  cards: IPostChannel[],
  timeList: string[],
): ICreateDate => {
  const { currentCard, cardsWithoutCurrent } = getCardData(datetime, card);

  const updatedCurrentCard = {
    ...currentCard,
    time_from: timeList[0],
    time_to: timeList[1],
  };

  const updatedOtherCards = cardsWithoutCurrent.map((order) => {
    const orderCard = cards.find((c) => c.id === order.order_id);
    if (
      orderCard?.platform === card.platform &&
      !order.time_from &&
      !order.time_to
    ) {
      return {
        ...order,
        time_from: timeList[0],
        time_to: timeList[1],
      };
    }
    return order;
  });

  return {
    ...datetime,
    orders: [...updatedOtherCards, updatedCurrentCard],
  };
};

/**
 * Вычислить новый datetime-стейт после смены даты.
 * formatDate — функция форматирования Date → string (DD.MM.YYYY).
 */
export const buildDatetimeAfterDateChange = (
  datetime: ICreateDate,
  card: IPostChannel,
  cards: IPostChannel[],
  dateList: Date[],
  formatDate: (d: Date) => string,
): ICreateDate => {
  const { currentCard, cardsWithoutCurrent } = getCardData(datetime, card);

  const updatedCurrentCard = { ...currentCard };

  let dateValue: string | undefined;
  let dateFrom: string | undefined;
  let dateTo: string | undefined;

  if (dateList.length === 1) {
    delete updatedCurrentCard.date_from;
    delete updatedCurrentCard.date_to;
    updatedCurrentCard.date = formatDate(dateList[0]);
    dateValue = formatDate(dateList[0]);
  } else {
    delete updatedCurrentCard.date;
    updatedCurrentCard.date_from = formatDate(dateList[0]);
    updatedCurrentCard.date_to = formatDate(dateList[1]);
    dateFrom = formatDate(dateList[0]);
    dateTo = formatDate(dateList[1]);
  }

  const updatedOtherCards = cardsWithoutCurrent.map((order) => {
    const orderCard = cards.find((c) => c.id === order.order_id);
    const hasNoDate = !order.date && !order.date_from && !order.date_to;
    if (orderCard?.platform === card.platform && hasNoDate) {
      const updatedOrder = { ...order };
      if (dateValue) {
        delete updatedOrder.date_from;
        delete updatedOrder.date_to;
        updatedOrder.date = dateValue;
      } else {
        delete updatedOrder.date;
        updatedOrder.date_from = dateFrom;
        updatedOrder.date_to = dateTo;
      }
      return updatedOrder;
    }
    return order;
  });

  return {
    ...datetime,
    orders: [...updatedOtherCards, updatedCurrentCard],
  };
};

/**
 * Очистить устаревшие даты из orders.
 * Возвращает новый массив orders и флаг hasChanges.
 */
export const cleanExpiredDates = (
  orders: IDatetime[],
  today: Date,
  parseDate: (s: string) => Date,
): { cleanedOrders: IDatetime[]; hasChanges: boolean } => {
  let hasChanges = false;

  const cleanedOrders = orders.map((order) => {
    const updated = { ...order };

    if (updated.date) {
      const d = parseDate(updated.date);
      d.setHours(0, 0, 0, 0);
      if (d < today) {
        delete updated.date;
        hasChanges = true;
      }
    }

    if (updated.date_from) {
      const d = parseDate(updated.date_from);
      d.setHours(0, 0, 0, 0);
      if (d < today) {
        delete updated.date_from;
        delete updated.date_to;
        hasChanges = true;
      }
    }

    return updated;
  });

  return { cleanedOrders, hasChanges };
};
