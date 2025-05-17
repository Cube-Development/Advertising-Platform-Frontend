import { AppDispatch } from "@app/providers/store";
import { dateSortingTypes } from "@entities/platform";
import { ENUM_ROLES } from "@entities/user";
import { ADV_TARIFF_ORDERS, VIEWS_ADVERTISER } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ILanguage, USER_LANGUAGES_LIST } from "@shared/languages";
import { advProjectsAPI, getProjectsCardReq } from "../../api";
import { advManagerProjectStatusFilter } from "../../config";
import { IAdvProjects } from "../../types";

interface Props {
  dispatch: AppDispatch;
  trigger: ReturnType<
    typeof advProjectsAPI.useLazyGetAdvManagerProjectsQuery
  >[0];
  language: ILanguage;
  project_id: string;
  role: ENUM_ROLES;
}

export const invalidateAdvManagerProjectByLaunchProject = async ({
  dispatch,
  trigger,
  language = USER_LANGUAGES_LIST[0],
  project_id,
  role,
}: Props) => {
  if (role !== ENUM_ROLES.ADVERTISER) return;

  // 1. Удалим проект из кеша проектов на согласовании
  const baseParams = {
    status: advManagerProjectStatusFilter.request_approve,
    language: language?.id,
    date_sort: dateSortingTypes.decrease,
  };
  dispatch(
    advProjectsAPI.util.updateQueryData(
      "getAdvManagerProjects",
      baseParams as getProjectsCardReq,
      (draft: IAdvProjects) => {
        draft.projects = draft.projects.filter((el) => el.id !== project_id);
      },
    ),
  );

  // 2. Обновляем кэш проектов активные
  const params = {
    status: advManagerProjectStatusFilter.active,
    language: language?.id,
    date_sort: dateSortingTypes.decrease,
    page: 1,
    elements_on_page: INTERSECTION_ELEMENTS.ADV_ORDERS,
    __isWebsocket: true,
  };

  await trigger(params).unwrap();

  // 3. Обновляем кэш кружочков
  dispatch(
    advProjectsAPI.util.invalidateTags([VIEWS_ADVERTISER, ADV_TARIFF_ORDERS]),
  );
};
