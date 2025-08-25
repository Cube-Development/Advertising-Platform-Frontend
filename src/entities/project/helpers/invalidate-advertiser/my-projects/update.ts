import { AppDispatch } from "@app/providers/store";
import { dateSortingTypes } from "@entities/platform";
import { ENUM_ROLES } from "@entities/user";
import { VIEWS_ADVERTISER } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ILanguage, USER_LANGUAGES_LIST } from "@shared/languages";
import { advProjectsAPI } from "../../../api";
import {
  ENUM_ADV_MANAGER_PROJECT_STATUS,
  ENUM_ADV_MY_PROJECT_STATUS,
} from "../../../config";

interface Props {
  dispatch: AppDispatch;
  trigger: ReturnType<
    | typeof advProjectsAPI.useLazyGetAdvManagerProjectsQuery
    | typeof advProjectsAPI.useLazyGetAdvProjectsQuery
  >[0];
  language: ILanguage;
  role: ENUM_ROLES;
  status: ENUM_ADV_MANAGER_PROJECT_STATUS | ENUM_ADV_MY_PROJECT_STATUS;
}

export const invalidateAdvProjectUpdate = async ({
  dispatch,
  trigger,
  language = USER_LANGUAGES_LIST[0],
  role,
  status,
}: Props) => {
  if (role !== ENUM_ROLES.ADVERTISER) return;

  // 1. Обновляем кэш проектов в разработке
  const params = {
    status: status,
    language: language?.id,
    date_sort: dateSortingTypes.decrease,
    page: 1,
    elements_on_page: INTERSECTION_ELEMENTS.ADV_PROJECTS,
    __isWebsocket: true,
  };

  await trigger(params).unwrap();

  // 2. Обновляем кэш кружочков
  dispatch(advProjectsAPI.util.invalidateTags([VIEWS_ADVERTISER]));
};
