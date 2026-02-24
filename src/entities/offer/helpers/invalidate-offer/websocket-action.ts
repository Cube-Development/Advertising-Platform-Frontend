import { AppDispatch } from "@app/providers/store";
import { bloggerOffersAPI, ENUM_OFFER_STATUS } from "@entities/offer";
import { dateSortingTypes } from "@entities/platform";
import { BALANCE, USER_ME, VIEWS_BLOGGER_OFFERS } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ILanguage, USER_LANGUAGES_LIST } from "@shared/languages";

interface Props {
  dispatch: AppDispatch;
  trigger: ReturnType<typeof bloggerOffersAPI.useLazyGetBloggerOrdersQuery>[0];
  language: ILanguage;
  status: ENUM_OFFER_STATUS;
  skip_views?: boolean;
}

export const invalidateBloggerOfferByWebsocketAction = async ({
  dispatch,
  trigger,
  language = USER_LANGUAGES_LIST[0],
  status,
  skip_views = false,
}: Props) => {
  //   ? Из-за непонятной выдачи не понятно как лучше ревалидировать данные, так что просто сброс

  // 1. Обновляем кэш заказов в ожидании
  const params = {
    page: 1,
    elements_on_page: INTERSECTION_ELEMENTS.BLOGGER_OFFERS,
    language: language?.id,
    status: status,
    date_sort: dateSortingTypes.decrease,
    __isWebsocket: true,
  };

  await trigger(params).unwrap();
  dispatch(bloggerOffersAPI.util.invalidateTags([BALANCE, USER_ME]));

  if (skip_views) return;
  // 2. Обновляем кэш кружочков
  dispatch(bloggerOffersAPI.util.invalidateTags([VIEWS_BLOGGER_OFFERS]));
};
