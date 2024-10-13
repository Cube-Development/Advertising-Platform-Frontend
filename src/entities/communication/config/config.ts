export enum RecipientType {
  sender = "sender",
  receiver = "receiver",
}

export enum chatType {
  order = "order",
  project = "project",
}

export enum MeesageSendType {
  order_message_create = "OrderMessageCreate",
  project_message_create = "ProjectMessageCreate",
}

export enum MessageStatus {
  read = 1,
  unread = 0,
}

export const DAY_OF_WEEK = {
  Ru: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вск"],
};

export enum chatTypesFilter {
  blogger = "blogger",
  manager = "manager",
  advertiser = "advertiser",
}

export const chatAdvertiserTypes = [
  {
    name: "chat.types.blogger",
    type: chatTypesFilter.blogger,
  },
  {
    name: "chat.types.manager",
    type: chatTypesFilter.manager,
  },
];

export const chatManagerTypes = [
  {
    name: "chat.types.blogger",
    type: chatTypesFilter.blogger,
  },
  {
    name: "chat.types.advertiser",
    type: chatTypesFilter.advertiser,
  },
];

export enum notificationsTypes {
  order_message_add = "OrderMessageAdd",
  order_message_read = "OrderMessageRead",
  project_message_add = "ProjectMessageAdd",
  project_message_read = "ProjectMessageRead",
  new_manager_project = "NewManagerProject",
  request_approve = "RequestApprove",
  accept_approve = "AcceptApprove",
  notification_create_deposit = "NotificationCreateDeposit",
  notification_request_approve = "NotificationRequestApprove",
  notification_create_desire = "NotificationCreateDesire",
  notification_launch_manager_project = "NotificationLaunchManagerProject",
  notification_unban_channel = "NotificationUnbanChannel",
  notification_limited_ban_channel = "NotificationLimitedBanChannel",
  notification_unlimited_ban_channel = "NotificationUnlimitedBanChannel",
  notification_new_order_blogger = "NotificationNewOrderBlogger",
  notification_accept_order_blogger = "NotificationAcceptOrderBlogger",
  notification_publish_post = "NotificationPublishPost",
  notification_advertiser_reject_order = "NotificationAdvertiserRejectOrder",
  notification_advertiser_reject_order_moderator = "NotificationAdvertiserRejectOrderModerator",
  notification_advertiser_accept_order = "NotificationAdvertiserAcceptOrder",
  notification_moderation_order_blogger_positive = "NotificationModerationOrderBloggerPositive",
  notification_moderation_order_advertiser_negative = "NotificationModerationOrderAdvertiserNegative",
  notification_moderation_order_blogger_negative = "NotificationModerationOrderBloggerNegative",
  notification_moderation_order_advertiser_positive = "NotificationModerationOrderAdvertiserPositive",
  notification_refund_manager_project = "NotificationRefundManagerProject",
}

export const notificationsStatus = [
  {
    name: "notifications.status.order_message_add.title",
    type: notificationsTypes.order_message_add,
  },
  {
    name: "notifications.status.order_message_read.title",
    type: notificationsTypes.order_message_read,
  },
  {
    name: "notifications.status.project_message_add.title",
    type: notificationsTypes.project_message_add,
  },
  {
    name: "notifications.status.project_message_read.title",
    type: notificationsTypes.project_message_read,
  },
  {
    name: "notifications.status.new_manager_project.title",
    type: notificationsTypes.new_manager_project,
  },
  {
    name: "notifications.status.request_approve.title",
    type: notificationsTypes.request_approve,
  },
  {
    name: "notifications.status.accept_approve.title",
    type: notificationsTypes.accept_approve,
  },
  {
    name: "notifications.status.notification_create_deposit.title",
    type: notificationsTypes.notification_create_deposit,
  },
  {
    name: "notifications.status.notification_request_approve.title",
    type: notificationsTypes.notification_request_approve,
  },
  {
    name: "notifications.status.notification_create_desire.title",
    type: notificationsTypes.notification_create_desire,
  },
  {
    name: "notifications.status.notification_launch_manager_project.title",
    type: notificationsTypes.notification_launch_manager_project,
  },
  {
    name: "notifications.status.notification_unban_channel.title",
    type: notificationsTypes.notification_unban_channel,
  },
  {
    name: "notifications.status.notification_limited_ban_channel.title",
    type: notificationsTypes.notification_limited_ban_channel,
  },
  {
    name: "notifications.status.notification_unlimited_ban_channel.title",
    type: notificationsTypes.notification_unlimited_ban_channel,
  },
  {
    name: "notifications.status.notification_new_order_blogger.title",
    type: notificationsTypes.notification_new_order_blogger,
  },
  {
    name: "notifications.status.notification_accept_order_blogger.title",
    type: notificationsTypes.notification_accept_order_blogger,
  },
  {
    name: "notifications.status.notification_publish_post.title",
    type: notificationsTypes.notification_publish_post,
  },
  {
    name: "notifications.status.notification_advertiser_reject_order.title",
    type: notificationsTypes.notification_advertiser_reject_order,
  },
  {
    name: "notifications.status.notification_advertiser_reject_order_moderator.title",
    type: notificationsTypes.notification_advertiser_reject_order_moderator,
  },
  {
    name: "notifications.status.notification_advertiser_accept_order.title",
    type: notificationsTypes.notification_advertiser_accept_order,
  },
  {
    name: "notifications.status.notification_moderation_order_blogger_positive.title",
    type: notificationsTypes.notification_moderation_order_blogger_positive,
  },
  {
    name: "notifications.status.notification_moderation_order_advertiser_negative.title",
    type: notificationsTypes.notification_moderation_order_advertiser_negative,
  },
  {
    name: "notifications.status.notification_moderation_order_blogger_negative.title",
    type: notificationsTypes.notification_moderation_order_blogger_negative,
  },
  {
    name: "notifications.status.notification_moderation_order_advertiser_positive.title",
    type: notificationsTypes.notification_moderation_order_advertiser_positive,
  },
  {
    name: "notifications.status.notification_refund_manager_project.title",
    type: notificationsTypes.notification_refund_manager_project,
  },
];
