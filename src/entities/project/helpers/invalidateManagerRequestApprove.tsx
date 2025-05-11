import { AppDispatch } from "@app/providers/store";
import { VIEWS_ADVERTISER } from "@shared/api";
import { ILanguage } from "@shared/languages";
import { advProjectsAPI, getProjectsCardReq, managerProjectsAPI } from "../api";
import { advManagerProjectStatusFilter } from "../config";
import { IAdvProjects } from "../types";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { dateSortingTypes } from "@entities/platform";

interface Props {
  dispatch: AppDispatch;
  trigger: ReturnType<
    typeof managerProjectsAPI.useLazyGetManagerProjectsQuery
  >[0];
  language: ILanguage;
  project_id: string;
}

export const invalidateManagerRequestApprove = async ({
  dispatch,
  trigger,
  language,
  project_id,
}: Props) => {
  try {
    let page: number | null = null;

    const baseParams = {
      status: advManagerProjectStatusFilter.request_approve,
      language: language?.id,
      date_sort: dateSortingTypes.decrease,
    };

    // 1. Найдём страницу в кеше, где лежит project_id
    dispatch(
      advProjectsAPI.util.updateQueryData(
        "getAdvManagerProjects",
        baseParams as getProjectsCardReq,
        (draft: IAdvProjects) => {
          if (!draft?.projects?.length) return;

          const index = draft.projects.findIndex((el) => el.id === project_id);

          if (index !== -1) {
            page = Math.floor(index / INTERSECTION_ELEMENTS.ADV_ORDERS) + 1;
          }
        },
      ),
    );

    if (!page) {
      page = 1;
    }

    // 2. Получаем актуальные данные по этой странице
    const response: IAdvProjects = await trigger({
      ...baseParams,
      page,
    }).unwrap();

    const updatedProject = response.projects?.find(
      (el) => el.id === project_id,
    );

    if (!updatedProject) {
      console.warn(
        "WARNING: INVALIDATE MANAGER REQUEST APPROVE - project not found in response",
      );
      return;
    }

    // 3. Обновляем кэш с новыми данными на этой странице
    dispatch(
      advProjectsAPI.util.updateQueryData(
        "getAdvManagerProjects",
        baseParams as getProjectsCardReq,
        (draft: IAdvProjects) => {
          if (!draft?.projects) return;

          // Удаляем старую версию
          draft.projects = draft.projects.filter((el) => el.id !== project_id);

          // Вставляем новую версию в начало
          draft.projects.unshift(updatedProject);
        },
      ),
    );
  } catch (err) {
    console.error("ERROR: INVALIDATE MANAGER REQUEST APPROVE - ", err);
  } finally {
    // 4. Обновляем кэш кружочков
    dispatch(advProjectsAPI.util.invalidateTags([VIEWS_ADVERTISER]));
  }
};
