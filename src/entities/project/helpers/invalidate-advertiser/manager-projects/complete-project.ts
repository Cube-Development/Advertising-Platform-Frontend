import { AppDispatch } from "@app/providers/store";
import { dateSortingTypes } from "@entities/platform";
import { ADV_TARIFF_ORDERS, BALANCE, VIEWS_ADVERTISER } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ILanguage, USER_LANGUAGES_LIST } from "@shared/languages";
import { advProjectsAPI, getProjectsCardReq } from "../../../api";
import { ENUM_ADV_MANAGER_PROJECT_STATUS } from "../../../config";
import { IAdvProjects } from "../../../types";

interface Props {
  dispatch: AppDispatch;
  trigger: ReturnType<
    typeof advProjectsAPI.useLazyGetAdvManagerProjectsQuery
  >[0];
  language: ILanguage;
  project_id: string;
}

export const invalidateAdvManagerProjectByCompleteProject = async ({
  dispatch,
  trigger,
  language = USER_LANGUAGES_LIST[0],
  project_id,
}: Props) => {
  // 1. Удалим проект из кеша проектов на активных
  const baseParams = {
    status: ENUM_ADV_MANAGER_PROJECT_STATUS.ACTIVE,
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

  // 2. Обновляем кэш проектов выполненные
  const params = {
    status: ENUM_ADV_MANAGER_PROJECT_STATUS.COMPLETED,
    language: language?.id,
    date_sort: dateSortingTypes.decrease,
    page: 1,
    elements_on_page: INTERSECTION_ELEMENTS.ADV_PROJECTS,
    __isWebsocket: true,
  };

  await trigger(params).unwrap();

  // 3. Обновляем кэш кружочков
  dispatch(
    advProjectsAPI.util.invalidateTags([
      ADV_TARIFF_ORDERS,
      VIEWS_ADVERTISER,
      BALANCE,
    ]),
  );
};
