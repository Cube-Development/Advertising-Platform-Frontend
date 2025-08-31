import { AppDispatch } from "@app/providers/store";
import { dateSortingTypes } from "@entities/platform";
import { MANAGER_ORDERS, VIEWS_MANAGER } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ILanguage, USER_LANGUAGES_LIST } from "@shared/languages";
import { getManagerProjectsCardReq, managerProjectsAPI } from "../../api";
import { ENUM_MANAGER_PROJECT_STATUS } from "../../config";
import { IManagerProjects } from "../../types";

interface Props {
  dispatch: AppDispatch;
  trigger: ReturnType<
    typeof managerProjectsAPI.useLazyGetManagerProjectsQuery
  >[0];
  language: ILanguage;
  id: string;
}

export const invalidateManagerProjectByCompleteProject = async ({
  dispatch,
  trigger,
  language = USER_LANGUAGES_LIST[0],
  id,
}: Props) => {
  // 1. Удалим проект из кеша проектов на активных
  const baseParams = {
    status: ENUM_MANAGER_PROJECT_STATUS.ACTIVE,
    language: language?.id,
    date_sort: dateSortingTypes.decrease,
  };
  dispatch(
    managerProjectsAPI.util.updateQueryData(
      "getManagerProjects",
      baseParams as getManagerProjectsCardReq,
      (draft: IManagerProjects) => {
        draft.projects = draft.projects.filter((el) => el.id !== id);
      },
    ),
  );

  // 2. Обновляем кэш проектов выполненные
  const params = {
    status: ENUM_MANAGER_PROJECT_STATUS.COMPLETED,
    language: language?.id,
    date_sort: dateSortingTypes.decrease,
    page: 1,
    elements_on_page: INTERSECTION_ELEMENTS.MANAGER_PROJECTS,
    __isWebsocket: true,
  };

  await trigger(params).unwrap();

  // 3. Обновляем кэш кружочков
  dispatch(
    managerProjectsAPI.util.invalidateTags([MANAGER_ORDERS, VIEWS_MANAGER]),
  );
};
