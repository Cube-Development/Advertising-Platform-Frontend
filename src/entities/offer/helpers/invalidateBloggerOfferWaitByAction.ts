import { AppDispatch } from "@app/providers/store";
import {
  bloggerOffersAPI,
  getOrdersByStatusReq,
  IBloggerOffers,
  offerStatusFilter,
} from "@entities/offer";
import { ENUM_ROLES } from "@entities/user";
import { VIEWS_BLOGGER_OFFERS } from "@shared/api";

interface Props {
  dispatch: AppDispatch;
  role: ENUM_ROLES;
  order_id: string;
}

export const invalidateBloggerOffersByWaitAction = async ({
  dispatch,
  role,
  order_id,
}: Props) => {
  if (role !== ENUM_ROLES.BLOGGER) return;

  // 1. Удаляем из кеша старый ордер
  dispatch(
    bloggerOffersAPI.util.updateQueryData(
      "getBloggerOrders",
      {
        status: offerStatusFilter.wait,
      } as getOrdersByStatusReq, // ключ кэша, т.к. serializeQueryArgs без page,
      (draft: IBloggerOffers) => {
        if (!draft?.orders?.length) return;

        draft.orders = draft.orders.filter((el) => el.id !== order_id);
      },
    ),
  );

  // 2. Обновляем кэш кружочков
  dispatch(bloggerOffersAPI.util.invalidateTags([VIEWS_BLOGGER_OFFERS]));
};
