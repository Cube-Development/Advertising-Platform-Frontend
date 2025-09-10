import {
  ENUM_CHANNEL_STATUS,
  channelAPI,
  invalidateBloggerChannelsAddChannelModeration,
  invalidateBloggerChannelsModerationDecision,
} from "@entities/channel";
import { notificationsTypes } from "@entities/communication";
import {
  ENUM_OFFER_STATUS,
  bloggerOffersAPI,
  invalidateBloggerOfferByUserAction,
  invalidateBloggerOfferByWebsocketAction,
} from "@entities/offer";
import {
  ENUM_ADV_MANAGER_PROJECT_STATUS,
  ENUM_ADV_MY_PROJECT_STATUS,
  advProjectsAPI,
  invalidateAdvManagerProjectByCompleteProject,
  invalidateAdvManagerProjectByLaunchProject,
  invalidateAdvManagerProjectByRequestApprove,
  invalidateAdvProjectByBloggerAction,
  invalidateAdvProjectByCompleteProject,
  invalidateAdvProjectUpdate,
  invalidateManagerNewProject,
  invalidateManagerProjectByBloggerAction,
  invalidateManagerProjectByCompleteProject,
  invalidateManagerProjectByDesire,
  managerProjectsAPI,
} from "@entities/project";
import { useFindLanguage } from "@entities/user";
import { invalidateHistory, walletAPI } from "@entities/wallet";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import {
  ADV_PROJECTS,
  VIEWS_ADVERTISER,
  VIEWS_BLOGGER_OFFERS,
} from "../../tags";

export const useRevalidateCash = () => {
  const language = useFindLanguage();
  const { role } = useAppSelector((state) => state.user);
  const [triggerHistory] = walletAPI.useLazyGetHistoryQuery();
  const [triggerManagerProjects] =
    managerProjectsAPI.useLazyGetManagerProjectsQuery();
  const [triggerAdvManagerProjects] =
    advProjectsAPI.useLazyGetAdvManagerProjectsQuery();
  const [triggerAdvMyProjects] = advProjectsAPI.useLazyGetAdvProjectsQuery();
  const [triggerChannels] = channelAPI.useLazyGetChannelsByStatusQuery();
  const [triggerOffers] = bloggerOffersAPI.useLazyGetBloggerOrdersQuery();
  const dispatch = useAppDispatch();

  const revalidateCash = async (data: any) => {
    const { method, project_id, order_id, channel_id, id } = data;

    if (method === notificationsTypes.notification_create_deposit) {
      // Создан депозит
      await invalidateHistory({ dispatch, trigger: triggerHistory, language });
    } else if (
      method === notificationsTypes.notification_refund_manager_project
    ) {
      // Возврат средств рекламодателю по проекту с менеджером
      await invalidateHistory({ dispatch, trigger: triggerHistory, language });
    } else if (method === notificationsTypes.buy_manager_project) {
      // Рекламодатель купил новый проект с менеджером (размещение под ключ) - уведомление рекламодателю
      await invalidateAdvProjectUpdate({
        dispatch,
        trigger: triggerAdvManagerProjects,
        language,

        status: ENUM_ADV_MANAGER_PROJECT_STATUS.DEVELOP,
      });
      await invalidateHistory({ dispatch, trigger: triggerHistory, language });
    } else if (method === notificationsTypes.new_manager_project) {
      // Рекламодатель купил новый проект с менеджером (размещение под ключ) - уведомление менеджеру
      await invalidateManagerNewProject({
        dispatch,
        trigger: triggerManagerProjects,
        language,
      });
    } else if (method === notificationsTypes.notification_request_approve) {
      // Менеджер отправил проект на согласование рекламодателю
      await invalidateAdvManagerProjectByRequestApprove({
        dispatch,
        trigger: triggerAdvManagerProjects,
        language,
        project_id,
      });
    } else if (method === notificationsTypes.notification_create_desire) {
      // Рекламодатель отправил проект на ре согласование (заменить канал, заменить пост)
      await invalidateManagerProjectByDesire({
        dispatch,
        trigger: triggerManagerProjects,
        language,
        project_id,
      });
    } else if (method === notificationsTypes.notification_approve_project) {
      // Рекламодатель подтвердил проект с менеджером
      // invalidateCreateDesire - подходит по смыслу обновления данных в кеше у менеджера
      await invalidateManagerProjectByDesire({
        dispatch,
        trigger: triggerManagerProjects,
        language,
        project_id,
      });
    } else if (
      method === notificationsTypes.notification_launch_manager_project
    ) {
      // Менеджер запустил проект рекламодателя
      await invalidateAdvManagerProjectByLaunchProject({
        dispatch,
        trigger: triggerAdvManagerProjects,
        language,
        project_id,
      });
    } else if (
      method === notificationsTypes.notification_complete_manager_project
    ) {
      // Менеджер завершил проект рекламодателя - уведомление рекламодателю
      await invalidateAdvManagerProjectByCompleteProject({
        dispatch,
        trigger: triggerAdvManagerProjects,
        language,
        project_id,
      });
    } else if (
      method === notificationsTypes.notification_complete_project_for_manager
    ) {
      // Менеджер завершил проект рекламодателя - уведомление менеджеру
      await invalidateManagerProjectByCompleteProject({
        dispatch,
        trigger: triggerManagerProjects,
        language,
        project_id: id,
      });
    } else if (method === notificationsTypes.new_my_project) {
      // Рекламодатель создал сам новый проект
      await invalidateAdvProjectUpdate({
        dispatch,
        trigger: triggerAdvMyProjects,
        language,
        status: ENUM_ADV_MY_PROJECT_STATUS.ACTIVE,
      });
    } else if (
      method === notificationsTypes.notification_complete_advertiser_project
    ) {
      // Рекламодатель завершил свой проект
      await invalidateAdvProjectByCompleteProject({
        dispatch,
        trigger: triggerAdvMyProjects,
        language,
        project_id,
      });
    } else if (method === notificationsTypes.notification_request_add_channel) {
      // Блогер  создал новый канал и отправил админу на модерацию
      await invalidateBloggerChannelsAddChannelModeration({
        dispatch,
        trigger: triggerChannels,
        language,
      });
    } else if (
      method === notificationsTypes.notification_accept_order_blogger
    ) {
      // Блогер принял новый заказ из ожидающих
      // кеш Блогера
      await invalidateBloggerOfferByUserAction({
        dispatch,
        order_id,
        status: ENUM_OFFER_STATUS.WAIT,
      });
      // кеш Рекламодателя
      await invalidateAdvProjectByBloggerAction({
        dispatch,
        trigger: triggerAdvMyProjects,
        language,
        project_id,
      });
      // кеш менеджера
      await invalidateManagerProjectByBloggerAction({
        dispatch,
        trigger: triggerManagerProjects,
        language,
        project_id,
      });
    } else if (
      method === notificationsTypes.notification_cancel_order_blogger
    ) {
      // Блогер отклонил новый заказ из ожидающих
      // кеш Блогера
      await invalidateBloggerOfferByUserAction({
        dispatch,
        order_id,
        status: ENUM_OFFER_STATUS.WAIT,
      });
      // кеш Рекламодателя
      await invalidateAdvProjectByBloggerAction({
        dispatch,
        trigger: triggerAdvMyProjects,
        language,
        project_id,
        invalidateBalance: true,
      });
      // кеш менеджера
      await invalidateManagerProjectByBloggerAction({
        dispatch,
        trigger: triggerManagerProjects,
        language,
        project_id,
      });
    } else if (method === notificationsTypes.notification_must_publish_post) {
      // Блогер должен разместить пост в назначенное время (просто ревалидация кружочков)
      dispatch(bloggerOffersAPI.util.invalidateTags([VIEWS_BLOGGER_OFFERS]));
    } else if (method === notificationsTypes.notification_post_not_published) {
      // Блогер не разместил пост вовремя
      // кеш Рекламодателя
      await invalidateAdvProjectByBloggerAction({
        dispatch,
        trigger: triggerAdvMyProjects,
        language,
        project_id,
      });
      // кеш менеджера
      await invalidateManagerProjectByBloggerAction({
        dispatch,
        trigger: triggerManagerProjects,
        language,
        project_id,
      });
    } else if (method === notificationsTypes.notification_publish_post) {
      // Блогер разместил пост
      // кеш Рекламодателя
      await invalidateAdvProjectByBloggerAction({
        dispatch,
        trigger: triggerAdvMyProjects,
        language,
        project_id,
      });
      // кеш менеджера
      await invalidateManagerProjectByBloggerAction({
        dispatch,
        trigger: triggerManagerProjects,
        language,
        project_id,
      });
    } else if (method === notificationsTypes.notification_new_order_blogger) {
      // Блогеру пришел новый заказ размещение рекламы (в ожидании)
      await invalidateBloggerOfferByWebsocketAction({
        dispatch,
        trigger: triggerOffers,
        language,
        status: ENUM_OFFER_STATUS.WAIT,
      });
    } else if (
      method === notificationsTypes.notification_advertiser_reject_order
    ) {
      // Рекламодатель отклонил заказ
      // кеш Блогера
      await invalidateBloggerOfferByUserAction({
        dispatch,
        order_id,
        status: ENUM_OFFER_STATUS.ACTIVE,
      });
      await invalidateBloggerOfferByWebsocketAction({
        dispatch,
        trigger: triggerOffers,
        language,

        status: ENUM_OFFER_STATUS.MODERATION,
        skip_views: true,
      });
    } else if (
      method === notificationsTypes.notification_advertiser_accept_order
    ) {
      // Рекламодатель принял заказ
      // кеш Блогера
      await invalidateBloggerOfferByUserAction({
        dispatch,
        order_id,
        status: ENUM_OFFER_STATUS.ACTIVE,
      });
      await invalidateBloggerOfferByWebsocketAction({
        dispatch,
        trigger: triggerOffers,
        language,
        status: ENUM_OFFER_STATUS.COMPLETED,
        skip_views: true,
      });
    } else if (
      method ===
      notificationsTypes.notification_moderation_order_blogger_positive
    ) {
      // Уведомление блогеру о модерации заказа в пользу блогера
      // кеш Блогера
      await invalidateBloggerOfferByUserAction({
        dispatch,
        order_id,
        status: ENUM_OFFER_STATUS.MODERATION,
        invalidateBalance: true,
      });
      await invalidateBloggerOfferByWebsocketAction({
        dispatch,
        trigger: triggerOffers,
        language,
        status: ENUM_OFFER_STATUS.COMPLETED,
        skip_views: true,
      });
    } else if (
      method ===
      notificationsTypes.notification_moderation_order_blogger_negative
    ) {
      // Уведомление блогеру о модерации заказа в пользу рекламодателя
      // кеш Блогера
      await invalidateBloggerOfferByUserAction({
        dispatch,
        order_id,
        status: ENUM_OFFER_STATUS.MODERATION,
      });
      await invalidateBloggerOfferByWebsocketAction({
        dispatch,
        trigger: triggerOffers,
        language,
        status: ENUM_OFFER_STATUS.CANCELED,
        skip_views: true,
      });
    } else if (
      method ===
      notificationsTypes.notification_moderation_order_advertiser_negative
    ) {
      // Уведомление рекламодателю о модерации заказа в пользу блогера
      // кеш Рекламодателя - подходит для ревалидации
      await invalidateAdvProjectByBloggerAction({
        dispatch,
        trigger: triggerAdvMyProjects,
        language,
        project_id,
      });
      // кеш менеджера - подходит для ревалидации
      await invalidateManagerProjectByBloggerAction({
        dispatch,
        trigger: triggerManagerProjects,
        language,
        project_id,
      });
    } else if (
      method ===
      notificationsTypes.notification_moderation_order_advertiser_positive
    ) {
      // Уведомление рекламодателю о модерации заказа в пользу рекламодателя
      // кеш Рекламодателя - подходит для ревалидации
      await invalidateAdvProjectByBloggerAction({
        dispatch,
        trigger: triggerAdvMyProjects,
        language,
        project_id,
        invalidateBalance: true,
      });
      // кеш менеджера - подходит для ревалидации
      await invalidateManagerProjectByBloggerAction({
        dispatch,
        trigger: triggerManagerProjects,
        language,
        project_id,
      });
    }
    // Ревалидация каналов у блогера при изменении статусов канала
    else if (method === notificationsTypes.notification_unban_channel) {
      // Уведомление блогеру о разблокировке канала
      console.log(notificationsTypes.notification_unban_channel);
      await invalidateBloggerChannelsModerationDecision({
        dispatch,
        trigger: triggerChannels,
        language,
        channel_id: channel_id,
        status_from: ENUM_CHANNEL_STATUS.BANNED,
        status_to: ENUM_CHANNEL_STATUS.ACTIVE,
      });
    } else if (
      method === notificationsTypes.notification_moderation_unblock_channel
    ) {
      // Уведомление блогеру о разблокировке канала
      console.log(notificationsTypes.notification_moderation_unblock_channel);
      await invalidateBloggerChannelsModerationDecision({
        dispatch,
        trigger: triggerChannels,
        language,
        channel_id: channel_id,
        status_from: ENUM_CHANNEL_STATUS.BANNED,
        status_to: ENUM_CHANNEL_STATUS.ACTIVE,
      });
    } else if (method === notificationsTypes.notification_ban_channel) {
      // Уведомление блогеру о блокировке канала
      console.log(notificationsTypes.notification_ban_channel);
      await invalidateBloggerChannelsModerationDecision({
        dispatch,
        trigger: triggerChannels,
        language,
        channel_id: channel_id,
        status_from: ENUM_CHANNEL_STATUS.ACTIVE,
        status_to: ENUM_CHANNEL_STATUS.BANNED,
      });
    } else if (
      method === notificationsTypes.notification_moderation_accept_channel
    ) {
      // Уведомление блогеру о прохождении модерации канала
      console.log(notificationsTypes.notification_moderation_accept_channel);
      await invalidateBloggerChannelsModerationDecision({
        dispatch,
        trigger: triggerChannels,
        language,
        channel_id: channel_id,
        status_from: ENUM_CHANNEL_STATUS.MODERATION,
        status_to: ENUM_CHANNEL_STATUS.ACTIVE,
      });
    } else if (
      method === notificationsTypes.notification_moderation_reject_channel
    ) {
      // Уведомление блогеру о отклонении модерации канала
      console.log(notificationsTypes.notification_moderation_reject_channel);
      await invalidateBloggerChannelsModerationDecision({
        dispatch,
        trigger: triggerChannels,
        language,
        channel_id: channel_id,
        status_from: ENUM_CHANNEL_STATUS.MODERATION,
        status_to: ENUM_CHANNEL_STATUS.REJECTED,
      });
    } else if (
      method === notificationsTypes.notification_request_to_edit_channel_accept
    ) {
      // Уведомление блогеру о одобрении редактирования канала
      console.log(
        notificationsTypes.notification_request_to_edit_channel_accept,
      );
      await invalidateBloggerChannelsModerationDecision({
        dispatch,
        trigger: triggerChannels,
        language,
        channel_id: channel_id,
        status_from: ENUM_CHANNEL_STATUS.MODERATION,
        status_to: ENUM_CHANNEL_STATUS.ACTIVE,
      });
    } else if (
      method ===
      notificationsTypes.notification_request_to_edit_channel_rejected
    ) {
      // Уведомление блогеру об отклонении редактирования канала
      console.log(
        notificationsTypes.notification_request_to_edit_channel_rejected,
      );
      await invalidateBloggerChannelsModerationDecision({
        dispatch,
        trigger: triggerChannels,
        language,
        channel_id: channel_id,
        status_from: ENUM_CHANNEL_STATUS.MODERATION,
        status_to: ENUM_CHANNEL_STATUS.REJECTED,
      });
    }
    //
    else if (method === notificationsTypes.notification_publish_post) {
      console.log(notificationsTypes.notification_publish_post);
      dispatch(
        advProjectsAPI.util.invalidateTags([ADV_PROJECTS, VIEWS_ADVERTISER]),
      );
    }
  };

  return { revalidateCash };
};
