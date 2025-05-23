import {
  channelAPI,
  invalidateBloggerChannelsOnModeration,
} from "@entities/channel";
import { notificationsTypes } from "@entities/communication";
import {
  bloggerOffersAPI,
  invalidateBloggerOfferByAction,
  invalidateBloggerOfferByNewOrder,
  offerStatusFilter,
} from "@entities/offer";
import {
  advManagerProjectStatusFilter,
  advProjectsAPI,
  invalidateAdvManagerProjectByCompleteProject,
  invalidateAdvManagerProjectByLaunchProject,
  invalidateAdvManagerProjectByRequestApprove,
  invalidateAdvProjectByBloggerAction,
  invalidateAdvProjectUpdate,
  invalidateManagerNewProject,
  invalidateManagerProjectByBloggerAction,
  invalidateManagerProjectByDesire,
  managerProjectsAPI,
  myProjectStatusFilter,
} from "@entities/project";
import { useFindLanguage } from "@entities/user";
import { invalidateHistory, walletAPI } from "@entities/wallet";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import {
  ADV_PROJECTS,
  BLOGGER_CHANNELS,
  VIEWS_ADVERTISER,
  VIEWS_BLOGGER_CHANNELS,
  VIEWS_BLOGGER_OFFERS,
} from "./../../tags";

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
    const { method, project_id, order_id } = data;

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
        role,
        status: advManagerProjectStatusFilter.develop,
      });
      await invalidateHistory({ dispatch, trigger: triggerHistory, language });
    } else if (method === notificationsTypes.new_manager_project) {
      // Рекламодатель купил новый проект с менеджером (размещение под ключ) - уведомление менеджеру
      await invalidateManagerNewProject({
        dispatch,
        trigger: triggerManagerProjects,
        language,
        role,
      });
    } else if (method === notificationsTypes.notification_request_approve) {
      // Менеджер отправил проект на согласование рекламодателю
      await invalidateAdvManagerProjectByRequestApprove({
        dispatch,
        trigger: triggerAdvManagerProjects,
        language,
        project_id,
        role,
      });
    } else if (method === notificationsTypes.notification_create_desire) {
      // Рекламодатель отправил проект на ре согласование (заменить канал, заменить пост)
      await invalidateManagerProjectByDesire({
        dispatch,
        trigger: triggerManagerProjects,
        language,
        project_id,
        role,
      });
    } else if (method === notificationsTypes.notification_approve_project) {
      // Рекламодатель подтвердил проект с менеджером
      // invalidateCreateDesire - подходит по смыслу обновления данных в кеше у менеджера
      await invalidateManagerProjectByDesire({
        dispatch,
        trigger: triggerManagerProjects,
        language,
        project_id,
        role,
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
        role,
      });
    } else if (
      method === notificationsTypes.notification_complete_manager_project
    ) {
      // Менеджер завершил проект рекламодателя
      await invalidateAdvManagerProjectByCompleteProject({
        dispatch,
        trigger: triggerAdvManagerProjects,
        language,
        project_id,
        role,
      });
    } else if (method === notificationsTypes.new_my_project) {
      // Рекламодатель создал сам новый проект
      await invalidateAdvProjectUpdate({
        dispatch,
        trigger: triggerAdvMyProjects,
        language,
        role,
        status: myProjectStatusFilter.active,
      });
    } else if (method === notificationsTypes.notification_request_add_channel) {
      // Блогер  создал новый канал и отправил админу на модерацию
      await invalidateBloggerChannelsOnModeration({
        dispatch,
        trigger: triggerChannels,
        language,
        role,
      });
    } else if (
      method === notificationsTypes.notification_accept_order_blogger
    ) {
      // Блогер принял новый заказ из ожидающих
      // кеш Блогера
      await invalidateBloggerOfferByAction({
        dispatch,
        role,
        order_id,
        status: offerStatusFilter.wait,
      });
      // кеш Рекламодателя
      await invalidateAdvProjectByBloggerAction({
        dispatch,
        trigger: triggerAdvMyProjects,
        language,
        project_id,
        role,
      });
      // кеш менеджера
      await invalidateManagerProjectByBloggerAction({
        dispatch,
        trigger: triggerManagerProjects,
        language,
        project_id,
        role,
      });
    } else if (
      method === notificationsTypes.notification_cancel_order_blogger
    ) {
      // Блогер отклонил новый заказ из ожидающих
      // кеш Блогера
      await invalidateBloggerOfferByAction({
        dispatch,
        role,
        order_id,
        status: offerStatusFilter.wait,
      });
      // кеш Рекламодателя
      await invalidateAdvProjectByBloggerAction({
        dispatch,
        trigger: triggerAdvMyProjects,
        language,
        project_id,
        role,
      });
      // кеш менеджера
      await invalidateManagerProjectByBloggerAction({
        dispatch,
        trigger: triggerManagerProjects,
        language,
        project_id,
        role,
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
        role,
      });
      // кеш менеджера
      await invalidateManagerProjectByBloggerAction({
        dispatch,
        trigger: triggerManagerProjects,
        language,
        project_id,
        role,
      });
    } else if (method === notificationsTypes.notification_publish_post) {
      // Блогер разместил пост
      // кеш Рекламодателя
      await invalidateAdvProjectByBloggerAction({
        dispatch,
        trigger: triggerAdvMyProjects,
        language,
        project_id,
        role,
      });
      // кеш менеджера
      await invalidateManagerProjectByBloggerAction({
        dispatch,
        trigger: triggerManagerProjects,
        language,
        project_id,
        role,
      });
    } else if (method === notificationsTypes.notification_new_order_blogger) {
      // Блогеру пришел новый заказ размещение рекламы (в ожидании)
      await invalidateBloggerOfferByNewOrder({
        dispatch,
        trigger: triggerOffers,
        language,
        role,
        status: offerStatusFilter.wait,
      });
    } else if (
      method === notificationsTypes.notification_advertiser_reject_order
    ) {
      // Рекламодатель отклонил заказ
      // кеш Блогера
      await invalidateBloggerOfferByAction({
        dispatch,
        role,
        order_id,
        status: offerStatusFilter.active,
      });
      await invalidateBloggerOfferByNewOrder({
        dispatch,
        trigger: triggerOffers,
        language,
        role,
        status: offerStatusFilter.moderation,
        skip_views: true,
      });
    } else if (
      method === notificationsTypes.notification_advertiser_accept_order
    ) {
      // Рекламодатель принял заказ
      // кеш Блогера
      await invalidateBloggerOfferByAction({
        dispatch,
        role,
        order_id,
        status: offerStatusFilter.active,
      });
      await invalidateBloggerOfferByNewOrder({
        dispatch,
        trigger: triggerOffers,
        language,
        role,
        status: offerStatusFilter.completed,
        skip_views: true,
      });
    } else if (
      method ===
      notificationsTypes.notification_moderation_order_blogger_positive
    ) {
      // Уведомление блогеру о модерации заказа в пользу блогера
      // кеш Блогера
      await invalidateBloggerOfferByAction({
        dispatch,
        role,
        order_id,
        status: offerStatusFilter.moderation,
      });
      await invalidateBloggerOfferByNewOrder({
        dispatch,
        trigger: triggerOffers,
        language,
        role,
        status: offerStatusFilter.completed,
        skip_views: true,
      });
    } else if (
      method ===
      notificationsTypes.notification_moderation_order_blogger_negative
    ) {
      // Уведомление блогеру о модерации заказа в пользу блогера
      // кеш Блогера
      await invalidateBloggerOfferByAction({
        dispatch,
        role,
        order_id,
        status: offerStatusFilter.moderation,
      });
      await invalidateBloggerOfferByNewOrder({
        dispatch,
        trigger: triggerOffers,
        language,
        role,
        status: offerStatusFilter.canceled,
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
        role,
      });
      // кеш менеджера - подходит для ревалидации
      await invalidateManagerProjectByBloggerAction({
        dispatch,
        trigger: triggerManagerProjects,
        language,
        project_id,
        role,
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
        role,
      });
      // кеш менеджера - подходит для ревалидации
      await invalidateManagerProjectByBloggerAction({
        dispatch,
        trigger: triggerManagerProjects,
        language,
        project_id,
        role,
      });
    }

    // ffff
    // ffff
    // ffff
    else if (method === notificationsTypes.notification_unban_channel) {
      console.log(notificationsTypes.notification_unban_channel);
      dispatch(
        channelAPI.util.invalidateTags([
          BLOGGER_CHANNELS,
          VIEWS_BLOGGER_CHANNELS,
        ]),
      );
    } else if (method === notificationsTypes.notification_limited_ban_channel) {
      console.log(notificationsTypes.notification_limited_ban_channel);
      dispatch(
        channelAPI.util.invalidateTags([
          BLOGGER_CHANNELS,
          VIEWS_BLOGGER_CHANNELS,
        ]),
      );
    } else if (
      method === notificationsTypes.notification_unlimited_ban_channel
    ) {
      console.log(notificationsTypes.notification_unlimited_ban_channel);
      dispatch(
        channelAPI.util.invalidateTags([
          BLOGGER_CHANNELS,
          VIEWS_BLOGGER_CHANNELS,
        ]),
      );
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
