import { AppDispatch } from "@app/providers/store";
import { bloggerOffersAPI, ENUM_OFFER_STATUS } from "@entities/offer";
import { ILanguage } from "@shared/languages";
import { invalidateBloggerOfferByUserAction } from "./user-action";
import { invalidateBloggerOfferByWebsocketAction } from "./websocket-action";

interface Props {
  dispatch: AppDispatch;
  trigger: ReturnType<typeof bloggerOffersAPI.useLazyGetBloggerOrdersQuery>[0];
  language: ILanguage;
  order_id: string;
  frozen: boolean;
}

/** Заморозить можно только ожидающий или активный заказ — после разморозки он возвращается туда же */
const UNFROZEN_STATUSES = [ENUM_OFFER_STATUS.WAIT, ENUM_OFFER_STATUS.ACTIVE];

export const invalidateBloggerOfferByFreeze = async ({
  dispatch,
  trigger,
  language,
  order_id,
  frozen,
}: Props) => {
  // 1. Удаляем заказ из кеша вкладок, откуда он ушёл
  const fromStatuses = frozen ? UNFROZEN_STATUSES : [ENUM_OFFER_STATUS.FROZEN];
  for (const status of fromStatuses) {
    await invalidateBloggerOfferByUserAction({ dispatch, order_id, status });
  }

  // 2. Обновляем кэш вкладок, куда он пришёл
  const toStatuses = frozen ? [ENUM_OFFER_STATUS.FROZEN] : UNFROZEN_STATUSES;
  for (const status of toStatuses) {
    await invalidateBloggerOfferByWebsocketAction({
      dispatch,
      trigger,
      language,
      status,
    });
  }
};
