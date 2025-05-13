import { AppDispatch } from "@app/providers/store";
import {
  bloggerOffersAPI,
  getOrdersByStatusReq,
  IBloggerOffers,
  offerStatusFilter,
} from "@entities/offer";
import { dateSortingTypes } from "@entities/platform";
import { ENUM_ROLES } from "@entities/user";
import { BLOGGER_OFFERS, VIEWS_BLOGGER_OFFERS } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ILanguage, USER_LANGUAGES_LIST } from "@shared/languages";

interface Props {
  dispatch: AppDispatch;
  trigger: ReturnType<typeof bloggerOffersAPI.useLazyGetBloggerOrdersQuery>[0];
  language: ILanguage;
  role: ENUM_ROLES;
}

export const invalidateBloggerOffers = async ({
  dispatch,
  trigger,
  language = USER_LANGUAGES_LIST[0],
  role,
}: Props) => {
  if (role !== ENUM_ROLES.BLOGGER) return;

  //   ? Из-за непонятной выдачи не понятно как лучше ревалидировать данные, так что просто сброс

  // 1. Обновляем кэш заказов в ожидании
  const params = {
    status: offerStatusFilter.wait,
    language: language?.id,
    date_sort: dateSortingTypes.decrease,
    page: 1,
    elements_on_page: INTERSECTION_ELEMENTS.BLOGGER_OFFERS,
    __isWebsocket: true,
  };

  await trigger(params).unwrap();

  // 2. Обновляем кэш кружочков
  dispatch(bloggerOffersAPI.util.invalidateTags([VIEWS_BLOGGER_OFFERS]));
};
