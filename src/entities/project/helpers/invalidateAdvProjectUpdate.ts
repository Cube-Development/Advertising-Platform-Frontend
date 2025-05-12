import { AppDispatch } from "@app/providers/store";
import { dateSortingTypes } from "@entities/platform";
import { ENUM_ROLES } from "@entities/user";
import { VIEWS_ADVERTISER } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ILanguage, USER_LANGUAGES_LIST } from "@shared/languages";
import { advProjectsAPI } from "../api";
import {
  advManagerProjectStatusFilter,
  myProjectStatusFilter,
} from "../config";

interface Props {
  dispatch: AppDispatch;
  trigger: ReturnType<
    | typeof advProjectsAPI.useLazyGetAdvManagerProjectsQuery
    | typeof advProjectsAPI.useLazyGetAdvProjectsQuery
  >[0];
  language: ILanguage;
  role: ENUM_ROLES;
  status: advManagerProjectStatusFilter | myProjectStatusFilter;
}

export const invalidateAdvProjectUpdate = async ({
  dispatch,
  trigger,
  language = USER_LANGUAGES_LIST[0],
  role,
  status,
}: Props) => {
  if (role !== ENUM_ROLES.ADVERTISER) return;

  try {
    // 1. Обновляем кэш проектов в разработке
    const params = {
      status: status,
      language: language?.id,
      date_sort: dateSortingTypes.decrease,
      page: 1,
      elements_on_page: INTERSECTION_ELEMENTS.ADV_ORDERS,
      __isWebsocket: true,
    };

    await trigger(params).unwrap();

    // 2. Обновляем кэш кружочков
    dispatch(advProjectsAPI.util.invalidateTags([VIEWS_ADVERTISER]));
  } catch (err) {
    console.error("ERROR: INVALIDATE ADVERTISER PROJECT BY BUY TARIFF - ", err);
  }
};
