export enum RECIPIENT_TYPE {
  SENDER = "sender",
  RECEIVER = "receiver",
}

export enum CHAT_TYPE {
  ORDER = "order",
  PROJECT = "project",
}

export enum MESSAGE_SEND_TYPE {
  ORDER_MESSAGE_CREATE = "OrderMessageCreate",
  PROJECT_MESSAGE_CREATE = "ProjectMessageCreate",
}

export enum MESSAGE_STATUS {
  READ = 1,
  UNREAD = 0,
}

export const DAY_OF_WEEK = {
  Ru: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вск"],
};

export enum CHAT_FILTER {
  BLOGGER = "blogger",
  MANAGER = "manager",
  ADVERTISER = "advertiser",
}

export const CHAT_ADVERTISER_FILTER_TABS_LIST = [
  {
    name: "chat.types.blogger",
    type: CHAT_FILTER.BLOGGER,
  },
  {
    name: "chat.types.manager",
    type: CHAT_FILTER.MANAGER,
  },
];

export const CHAT_MANAGER_FILTER_TABS_LIST = [
  {
    name: "chat.types.blogger",
    type: CHAT_FILTER.BLOGGER,
  },
  {
    name: "chat.types.advertiser",
    type: CHAT_FILTER.ADVERTISER,
  },
];

export enum notificationsTypes {
  // order_message_add = "OrderMessageAdd",
  // order_message_read = "OrderMessageRead",
  // project_message_add = "ProjectMessageAdd",
  // project_message_read = "ProjectMessageRead",
  // new_manager_project = "NewManagerProject",
  // request_approve = "RequestApprove",
  // accept_approve = "AcceptApprove",
  // notification_create_deposit = "NotificationCreateDeposit",
  // notification_request_approve = "NotificationRequestApprove",
  // notification_create_desire = "NotificationCreateDesire",
  // notification_launch_manager_project = "NotificationLaunchManagerProject",
  // notification_unban_channel = "NotificationUnbanChannel",
  // notification_limited_ban_channel = "NotificationLimitedBanChannel",
  // notification_unlimited_ban_channel = "NotificationUnlimitedBanChannel",
  // notification_new_order_blogger = "NotificationNewOrderBlogger",
  // notification_accept_order_blogger = "NotificationAcceptOrderBlogger",
  // notification_publish_post = "NotificationPublishPost",
  // notification_advertiser_reject_order = "NotificationAdvertiserRejectOrder",
  // notification_advertiser_reject_order_moderator = "NotificationAdvertiserRejectOrderModerator",
  // notification_advertiser_accept_order = "NotificationAdvertiserAcceptOrder",
  // notification_moderation_order_blogger_positive = "NotificationModerationOrderBloggerPositive",
  // notification_moderation_order_advertiser_negative = "NotificationModerationOrderAdvertiserNegative",
  // notification_moderation_order_blogger_negative = "NotificationModerationOrderBloggerNegative",
  // notification_moderation_order_advertiser_positive = "NotificationModerationOrderAdvertiserPositive",
  // notification_refund_manager_project = "NotificationRefundManagerProject",

  order_message_add = "OrderMessageAdd",
  order_message_read = "OrderMessageRead",
  project_message_add = "ProjectMessageAdd",
  project_message_read = "ProjectMessageRead",
  new_my_project = "NewMyProject",
  buy_manager_project = "BuyManagerProject",
  new_manager_project = "NewManagerProject",
  request_approve = "RequestApprove",
  accept_approve = "AcceptApprove",
  notification_request_add_channel = "NotificationRequestAddChannel",
  notification_create_deposit = "NotificationCreateDeposit",
  notification_request_approve = "NotificationRequestApprove",
  notification_create_desire = "NotificationCreateDesire",
  notification_approve_project = "NotificationApproveProject",
  notification_launch_manager_project = "NotificationLaunchManagerProject",
  notification_complete_manager_project = "NotificationCompleteManagerProject",
  notification_unban_channel = "NotificationUnbanChannel",
  notification_limited_ban_channel = "NotificationLimitedBanChannel",
  notification_unlimited_ban_channel = "NotificationUnlimitedBanChannel",
  notification_new_order_blogger = "NotificationNewOrderBlogger",
  notification_accept_order_blogger = "NotificationAcceptOrderBlogger",
  notification_cancel_order_blogger = "NotificationCancelOrderBlogger",
  notification_must_publish_post = "NotificationMustPublishPost",
  notification_post_not_published = "NotificationPostNotPublished",
  notification_publish_post = "NotificationPublishPost",
  notification_advertiser_reject_order = "NotificationAdvertiserRejectOrder",
  notification_advertiser_reject_order_moderator = "NotificationAdvertiserRejectOrderModerator",
  notification_advertiser_accept_order = "NotificationAdvertiserAcceptOrder",
  notification_moderation_order_blogger_positive = "NotificationModerationOrderBloggerPositive",
  notification_moderation_order_advertiser_negative = "NotificationModerationOrderAdvertiserNegative",
  notification_moderation_order_blogger_negative = "NotificationModerationOrderBloggerNegative",
  notification_moderation_order_advertiser_positive = "NotificationModerationOrderAdvertiserPositive",
  notification_refund_manager_project = "NotificationRefundManagerProject",
  notification_moderation_reject_channel = "NotificationModerationRejectChannel",
  notification_moderation_accept_channel = "NotificationModerationAcceptChannel",
  notification_moderation_unblock_channel = "NotificationModerationUnblockChannel",
  notification_request_to_edit_channel = "NotificationRequestToEditChannel",
  notification_request_to_edit_channel_rejected = "NotificationRequestToEditChannelRejected",
  notification_request_to_edit_channel_accept = "NotificationRequestToEditChannelAccept",
}

export const websocketMessages = [
  notificationsTypes.order_message_add,
  notificationsTypes.order_message_read,
  notificationsTypes.project_message_add,
  notificationsTypes.project_message_read,
];

export const websocketNotifications = [
  notificationsTypes.new_manager_project,
  notificationsTypes.notification_create_deposit,
  notificationsTypes.notification_request_approve,
  notificationsTypes.notification_create_desire,
  notificationsTypes.notification_launch_manager_project,
  notificationsTypes.notification_unban_channel,
  notificationsTypes.notification_limited_ban_channel,
  notificationsTypes.notification_unlimited_ban_channel,
  notificationsTypes.notification_new_order_blogger,
  notificationsTypes.notification_accept_order_blogger,
  notificationsTypes.notification_publish_post,
  notificationsTypes.notification_advertiser_reject_order,
  notificationsTypes.notification_advertiser_reject_order_moderator,
  notificationsTypes.notification_advertiser_accept_order,
  notificationsTypes.notification_moderation_order_blogger_positive,
  notificationsTypes.notification_moderation_order_advertiser_negative,
  notificationsTypes.notification_moderation_order_blogger_negative,
  notificationsTypes.notification_moderation_order_advertiser_positive,
  notificationsTypes.notification_refund_manager_project,
];

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
