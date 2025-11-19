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
  AI_SAMPLE_REQUEST = "AiSampleRequest",
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
  ai_sample_not_ready = "AiSampleNotReady",
  ai_sample_ready = "AiSampleReady",
  order_message_add = "OrderMessageAdd",
  order_message_read = "OrderMessageRead",
  project_message_add = "ProjectMessageAdd",
  project_message_read = "ProjectMessageRead",
  new_my_project = "NewMyProject",
  buy_manager_project = "BuyManagerProject",
  new_manager_project = "NewManagerProject",
  new_manager_project_reminder = "NewManagerProjectReminder", //*
  request_approve = "RequestApprove",
  accept_approve = "AcceptApprove",
  notification_request_add_channel = "NotificationRequestAddChannel",
  notification_create_deposit_request = "NotificationCreateDepositRequest", //*
  notification_create_deposit = "NotificationCreateDeposit",
  notification_request_approve = "NotificationRequestApprove",
  notification_create_desire = "NotificationCreateDesire",
  notification_approve_project = "NotificationApproveProject",
  notification_launch_manager_project = "NotificationLaunchManagerProject",
  notification_complete_manager_project = "NotificationCompleteManagerProject",
  notification_complete_advertiser_project = "NotificationCompleteAdvertiserProject", //+
  notification_complete_project_for_manager = "NotificationCompleteProjectForManager", //*
  notification_unban_channel = "NotificationUnbanChannel",
  notification_ban_channel = "NotificationBanChannel", //+
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
  notification_moderation_reject_channel = "NotificationModerationRejectChannel", //+
  notification_moderation_accept_channel = "NotificationModerationAcceptChannel", //+
  notification_moderation_unblock_channel = "NotificationModerationUnblockChannel", //+
  notification_request_to_edit_channel = "NotificationRequestToEditChannel", //*
  notification_request_to_edit_channel_rejected = "NotificationRequestToEditChannelRejected", //+
  notification_request_to_edit_channel_accept = "NotificationRequestToEditChannelAccept", //+
  notification_create_organization = "NotificationCreateOrganization", //*
}

export const WEBSOCKET_MESSAGES_LIST = [
  notificationsTypes.order_message_add,
  notificationsTypes.order_message_read,
  notificationsTypes.project_message_add,
  notificationsTypes.project_message_read,
  notificationsTypes.ai_sample_not_ready,
  notificationsTypes.ai_sample_ready,
];

export const WEBSOCKET_NOTIFICATIONS_LIST = [
  notificationsTypes.new_manager_project,
  notificationsTypes.notification_request_add_channel,
  notificationsTypes.notification_create_deposit_request,
  notificationsTypes.notification_create_deposit,
  notificationsTypes.notification_request_approve,
  notificationsTypes.notification_create_desire,
  notificationsTypes.notification_approve_project,
  notificationsTypes.notification_launch_manager_project,
  notificationsTypes.notification_complete_manager_project,
  notificationsTypes.notification_complete_advertiser_project,
  notificationsTypes.notification_complete_project_for_manager,
  notificationsTypes.notification_unban_channel,
  notificationsTypes.notification_ban_channel,
  notificationsTypes.notification_new_order_blogger,
  notificationsTypes.notification_accept_order_blogger,
  notificationsTypes.notification_cancel_order_blogger,
  notificationsTypes.notification_must_publish_post,
  notificationsTypes.notification_post_not_published,
  notificationsTypes.notification_publish_post,
  notificationsTypes.notification_advertiser_reject_order,
  notificationsTypes.notification_advertiser_reject_order_moderator,
  notificationsTypes.notification_advertiser_accept_order,
  notificationsTypes.notification_moderation_order_blogger_positive,
  notificationsTypes.notification_moderation_order_advertiser_negative,
  notificationsTypes.notification_moderation_order_blogger_negative,
  notificationsTypes.notification_moderation_order_advertiser_positive,
  notificationsTypes.notification_refund_manager_project,
  notificationsTypes.notification_moderation_reject_channel,
  notificationsTypes.notification_moderation_accept_channel,
  notificationsTypes.notification_moderation_unblock_channel,
  notificationsTypes.notification_request_to_edit_channel,
  notificationsTypes.notification_request_to_edit_channel_rejected,
  notificationsTypes.notification_request_to_edit_channel_accept,
  notificationsTypes.notification_create_organization,
];
