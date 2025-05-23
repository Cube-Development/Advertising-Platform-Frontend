import { AppDispatch } from "@app/providers/store";
import { dateSortingTypes } from "@entities/platform";
import { ENUM_ROLES } from "@entities/user";
import { VIEWS_MANAGER } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ILanguage, USER_LANGUAGES_LIST } from "@shared/languages";
import { managerProjectsAPI } from "../../api";
import { managerProjectStatusFilter } from "../../config";

interface Props {
  dispatch: AppDispatch;
  trigger: ReturnType<
    typeof managerProjectsAPI.useLazyGetManagerProjectsQuery
  >[0];
  language: ILanguage;
  role: ENUM_ROLES;
}

export const invalidateManagerNewProject = async ({
  dispatch,
  trigger,
  language = USER_LANGUAGES_LIST[0],
  role,
}: Props) => {
  if (role !== ENUM_ROLES.MANAGER) return;

  // 1. Получаем page=1
  const params = {
    page: 1,
    elements_on_page: INTERSECTION_ELEMENTS.MANAGER_ORDERS,
    language: language?.id,
    date_sort: dateSortingTypes.decrease,
    status: managerProjectStatusFilter.new,
    __isWebsocket: true,
  };

  await trigger(params).unwrap();

  // 2. Обновляем кэш кружочков
  dispatch(managerProjectsAPI.util.invalidateTags([VIEWS_MANAGER]));
};
