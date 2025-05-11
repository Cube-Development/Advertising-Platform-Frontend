import { channelAPI } from "@entities/channel";
import { notificationsTypes } from "@entities/communication";
import { bloggerOffersAPI } from "@entities/offer";
import {
  advProjectsAPI,
  invalidateManagerRequestApprove,
  invalidateNewManagerProject,
  managerProjectsAPI,
} from "@entities/project";
import { useFindLanguage } from "@entities/user";
import { invalidateHistory, walletAPI } from "@entities/wallet";
import { useAppDispatch } from "@shared/hooks";
import {
  ADV_PROJECTS,
  ADV_TARIFF_PROJECTS,
  BLOGGER_CHANNELS,
  BLOGGER_OFFERS,
  TRANSACTION_HISTORY,
  VIEWS_ADVERTISER,
  VIEWS_BLOGGER_CHANNELS,
  VIEWS_BLOGGER_OFFERS,
  VIEWS_TRANSACTIONS,
} from "./../../tags";

export const useRevalidateCash = () => {
  const language = useFindLanguage();
  const [triggerHistory] = walletAPI.useLazyGetHistoryQuery();
  const [triggerNewManagerProject] =
    managerProjectsAPI.useLazyGetManagerProjectsQuery();
  const [triggerRequestApprove] =
    advProjectsAPI.useLazyGetAdvManagerProjectsQuery();
  const dispatch = useAppDispatch();

  const revalidateCash = async (data: any) => {
    const { method, project_id } = data;

    if (method === notificationsTypes.notification_create_deposit) {
      // Создан депозит
      await invalidateHistory({ dispatch, trigger: triggerHistory, language });
    } else if (method === notificationsTypes.new_manager_project) {
      // Рекламодатель купил новый проект с менеджером (размещение под ключ)
      await invalidateNewManagerProject({
        dispatch,
        trigger: triggerNewManagerProject,
        language,
      });
    } else if (method === notificationsTypes.notification_request_approve) {
      // Менеджер отправил проект на согласование рекламодателю
      await invalidateManagerRequestApprove({
        dispatch,
        trigger: triggerRequestApprove,
        language,
        project_id,
      });
    } else if (method === notificationsTypes.notification_create_desire) {
      console.log(notificationsTypes.notification_create_desire);
      dispatch(managerProjectsAPI.util.resetApiState());
    } else if (
      method === notificationsTypes.notification_launch_manager_project
    ) {
      console.log(notificationsTypes.notification_launch_manager_project);
      dispatch(
        advProjectsAPI.util.invalidateTags([
          ADV_TARIFF_PROJECTS,
          VIEWS_ADVERTISER,
        ]),
      );
    } else if (method === notificationsTypes.notification_unban_channel) {
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
    } else if (method === notificationsTypes.notification_new_order_blogger) {
      console.log(notificationsTypes.notification_new_order_blogger);
      dispatch(
        bloggerOffersAPI.util.invalidateTags([
          BLOGGER_OFFERS,
          VIEWS_BLOGGER_OFFERS,
        ]),
      );
    } else if (
      method === notificationsTypes.notification_accept_order_blogger
    ) {
      console.log(notificationsTypes.notification_accept_order_blogger);
      dispatch(
        advProjectsAPI.util.invalidateTags([ADV_PROJECTS, VIEWS_ADVERTISER]),
      );
    }
    //
    else if (method === notificationsTypes.notification_publish_post) {
      console.log(notificationsTypes.notification_publish_post);
      dispatch(
        advProjectsAPI.util.invalidateTags([ADV_PROJECTS, VIEWS_ADVERTISER]),
      );
    } else if (
      method === notificationsTypes.notification_advertiser_accept_order
    ) {
      console.log(notificationsTypes.notification_advertiser_accept_order);
      dispatch(
        bloggerOffersAPI.util.invalidateTags([
          BLOGGER_OFFERS,
          VIEWS_BLOGGER_OFFERS,
        ]),
      );
    } else if (
      method === notificationsTypes.notification_advertiser_reject_order
    ) {
      console.log(notificationsTypes.notification_advertiser_reject_order);
      dispatch(
        bloggerOffersAPI.util.invalidateTags([
          BLOGGER_OFFERS,
          VIEWS_BLOGGER_OFFERS,
        ]),
      );
    }
    // else if (
    //   method ===
    //   notificationsTypes.notification_advertiser_reject_order_moderator
    // ) {
    //   dispatch(bloggerOffersAPI.util.resetApiState());
    // }
    //
    else if (
      method ===
      notificationsTypes.notification_moderation_order_blogger_positive
    ) {
      console.log(
        notificationsTypes.notification_moderation_order_blogger_positive,
      );
      dispatch(
        bloggerOffersAPI.util.invalidateTags([
          BLOGGER_OFFERS,
          VIEWS_BLOGGER_OFFERS,
        ]),
      );
    } else if (
      method ===
      notificationsTypes.notification_moderation_order_blogger_negative
    ) {
      console.log(
        notificationsTypes.notification_moderation_order_blogger_negative,
      );
      dispatch(
        bloggerOffersAPI.util.invalidateTags([
          BLOGGER_OFFERS,
          VIEWS_BLOGGER_OFFERS,
        ]),
      );
    } else if (
      method ===
      notificationsTypes.notification_moderation_order_advertiser_negative
    ) {
      console.log(
        notificationsTypes.notification_moderation_order_advertiser_negative,
      );
      dispatch(
        advProjectsAPI.util.invalidateTags([
          ADV_TARIFF_PROJECTS,
          VIEWS_ADVERTISER,
        ]),
      );
    } else if (
      method ===
      notificationsTypes.notification_moderation_order_advertiser_positive
    ) {
      console.log(
        notificationsTypes.notification_moderation_order_advertiser_positive,
      );
      dispatch(
        advProjectsAPI.util.invalidateTags([
          ADV_TARIFF_PROJECTS,
          VIEWS_ADVERTISER,
        ]),
      );
    } else if (
      method === notificationsTypes.notification_refund_manager_project
    ) {
      console.log(notificationsTypes.notification_refund_manager_project);
      dispatch(
        walletAPI.util.invalidateTags([
          TRANSACTION_HISTORY,
          VIEWS_TRANSACTIONS,
        ]),
      );
    }
  };

  return { revalidateCash };
};
