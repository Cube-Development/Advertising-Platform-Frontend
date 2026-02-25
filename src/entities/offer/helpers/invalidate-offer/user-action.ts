import { AppDispatch } from "@app/providers/store";
import {
  bloggerOffersAPI,
  ENUM_OFFER_STATUS,
  getOrdersByStatusReq,
  IBloggerOffers,
} from "@entities/offer";
import { BALANCE, USER_ME, VIEWS_BLOGGER_OFFERS } from "@shared/api";

interface Props {
  dispatch: AppDispatch;
  order_id: string;
  status: ENUM_OFFER_STATUS;
  invalidateBalance?: boolean;
}

export const invalidateBloggerOfferByUserAction = async ({
  dispatch,
  order_id,
  status,
  invalidateBalance = false,
}: Props) => {
  // 1. Удаляем из кеша старый ордер
  dispatch(
    bloggerOffersAPI.util.updateQueryData(
      "getBloggerOrders",
      {
        status: status,
      } as getOrdersByStatusReq, // ключ кэша, т.к. serializeQueryArgs без page,
      (draft: IBloggerOffers) => {
        if (!draft?.orders?.length) return;

        draft.orders = draft.orders.filter((el) => el.id !== order_id);
      },
    ),
  );

  // 2. Обновляем кэш кружочков
  dispatch(bloggerOffersAPI.util.invalidateTags([VIEWS_BLOGGER_OFFERS]));

  if (invalidateBalance)
    dispatch(bloggerOffersAPI.util.invalidateTags([BALANCE, USER_ME]));
};
