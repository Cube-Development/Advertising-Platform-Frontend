export enum orderStatus {
  wait = 1,
  in_progress = 2,
  completed = 3,
  canceled = 4,
  rejected = 5,
  post_matched = 6,
  date_interval = 7,
  date_constant = 8,
  post_review = 9,
  moderation = 10,
  order_review = 11,
  channel_agreed = 12,
  adv_accept = 13,
}

export const orderStatusChat = [
  orderStatus.post_review,
  orderStatus.in_progress,
];

export enum desireStatus {
  replace_channel_request = 1,
  replace_post_request = 2,
}
