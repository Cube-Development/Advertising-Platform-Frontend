

import { AppDispatch } from "@app/providers/store";
import { dateSortingTypes } from "@entities/platform";
import { ENUM_ROLES } from "@entities/user";
import { MANAGER_ORDERS, VIEWS_MANAGER } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ILanguage, USER_LANGUAGES_LIST } from "@shared/languages";
import { getManagerProjectsCardReq, managerProjectsAPI } from "../api";
import { managerProjectStatusFilter } from "../config";
import { IManagerProjects } from "../types";

interface Props {
  dispatch: AppDispatch;
  trigger: ReturnType<
    typeof managerProjectsAPI.useLazyGetManagerProjectsQuery
  >[0];
  language: ILanguage;
  project_id: string;
  role: ENUM_ROLES;
}

export const invalidateManagerProjectByBloggerAction = async ({
  dispatch,
  trigger,
  language = USER_LANGUAGES_LIST[0],
  project_id,
  role,
}: Props) => {
  if (role !== ENUM_ROLES.MANAGER) return;

  let page: number | null = null;

  const baseParams = {
    status: managerProjectStatusFilter.active,
    language: language?.id,
    date_sort: dateSortingTypes.decrease,
  };

  // 1. Найдём страницу в кеше моих проектов активные, где лежит project_id
  dispatch(
    managerProjectsAPI.util.updateQueryData(
      "getManagerProjects",
      baseParams as getManagerProjectsCardReq,
      (draft: IManagerProjects) => {
        if (!draft?.projects?.length) return;

        const index = draft.projects.findIndex((el) => el.project_id === project_id);

        if (index !== -1) {
          page = Math.floor(index / INTERSECTION_ELEMENTS.MANAGER_ORDERS) + 1;
        }
      },
    ),
  );

  if (!page) {
    page = 1;
  }

  // 2. Получаем актуальные данные по этой странице
  const response: IManagerProjects = await trigger({
    ...baseParams,
    elements_on_page: INTERSECTION_ELEMENTS.MANAGER_ORDERS,
    page,
    __isWebsocket: true,
  }).unwrap();

  const updatedProject = response.projects?.find((el) => el.project_id === project_id);

  if (!updatedProject) {
    console.warn(
      "WARNING: INVALIDATE MANAGER REQUEST APPROVE - project not found in response",
    );
    return;
  }

  // 3. Обновляем кэш с новыми данными на этой странице
  dispatch(
    managerProjectsAPI.util.updateQueryData(
      "getManagerProjects",
      baseParams as getManagerProjectsCardReq,
      (draft: IManagerProjects) => {
        if (!draft?.projects) return;

        // Обновляем старую версию
        draft.projects = draft.projects.map((el) => {
          if (el.project_id === project_id) {
            return updatedProject;
          }
          return el;
        });
      },
    ),
  );

  // 4. Обновляем кэш кружочков и ордеров
  dispatch(managerProjectsAPI.util.invalidateTags([MANAGER_ORDERS, VIEWS_MANAGER]));
};
