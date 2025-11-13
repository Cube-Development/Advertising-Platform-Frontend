export enum orderStatus {
  wait = 1, // ожидает принятия блогером
  in_progress = 2, // запущен
  completed = 3, // выполнен
  canceled = 4, // отменен
  rejected = 5, // отклонен
  post_matched = 6, // пост загружен (нигде не используется)
  date_interval = 7, // дата интервал
  date_constant = 8, // дата постоянная
  post_review = 9, // пост опубликован
  moderation = 10, // на модерации
  order_review = 11, // есть комменты заказчика (desire)
  channel_agreed = 12, // согласованный канал
  adv_accept = 13, // отправил сф взял деньги(блогер)
  saved = 14, // ордер в сохраненном проекте
}

export const orderStatusChat = [
  orderStatus.post_review,
  orderStatus.in_progress,
];

export enum desireStatus {
  replace_channel_request = 1,
  replace_post_request = 2,
}
