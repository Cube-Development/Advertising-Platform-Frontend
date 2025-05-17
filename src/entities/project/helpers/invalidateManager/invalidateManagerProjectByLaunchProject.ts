import { AppDispatch } from "@app/providers/store";
import { dateSortingTypes } from "@entities/platform";
import { ENUM_ROLES } from "@entities/user";
import { MANAGER_ORDERS, VIEWS_MANAGER } from "@shared/api";
import { ILanguage, USER_LANGUAGES_LIST } from "@shared/languages";
import { getManagerProjectsCardReq, managerProjectsAPI } from "../../api";
import { managerProjectStatusFilter } from "../../config";
import { IManagerProjects } from "../../types";

interface Props {
  dispatch: AppDispatch;
  language: ILanguage;
  project_id: string;
  role: ENUM_ROLES;
}

export const invalidateManagerProjectByLaunchProject = async ({
  dispatch,
  language = USER_LANGUAGES_LIST[0],
  project_id,
  role,
}: Props) => {
  if (role !== ENUM_ROLES.MANAGER) return;

  const baseParams = {
    status: managerProjectStatusFilter.request_approve,
    language: language?.id,
    date_sort: dateSortingTypes.decrease,
  };

  // 1. Удалим проект (если он там есть) из кеша проектов в разработке
  dispatch(
    managerProjectsAPI.util.updateQueryData(
      "getManagerProjects",
      baseParams as getManagerProjectsCardReq,
      (draft: IManagerProjects) => {
        draft.projects = draft.projects.filter(
          (el) => el.project_id !== project_id,
        );
      },
    ),
  );

  // 2. Обновляем кэш кружочков
  dispatch(
    managerProjectsAPI.util.invalidateTags([VIEWS_MANAGER, MANAGER_ORDERS]),
  );
};
