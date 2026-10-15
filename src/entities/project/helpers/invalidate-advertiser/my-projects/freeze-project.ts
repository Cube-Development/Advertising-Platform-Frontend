import { AppDispatch } from "@app/providers/store";
import { dateSortingTypes } from "@entities/platform";
import { ADV_ORDERS, VIEWS_ADVERTISER } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ILanguage, USER_LANGUAGES_LIST } from "@shared/languages";
import { advProjectsAPI, getProjectsCardReq } from "../../../api";
import { ENUM_ADV_MY_PROJECT_STATUS } from "../../../config";
import { IAdvProjects } from "../../../types";

interface Props {
  dispatch: AppDispatch;
  trigger: ReturnType<typeof advProjectsAPI.useLazyGetAdvProjectsQuery>[0];
  language: ILanguage;
  project_id: string;
  frozen: boolean;
}

export const invalidateAdvProjectByFreeze = async ({
  dispatch,
  trigger,
  language = USER_LANGUAGES_LIST[0],
  project_id,
  frozen,
}: Props) => {
  // Заморозка: проект переезжает из активных в замороженные, разморозка — обратно
  const fromStatus = frozen
    ? ENUM_ADV_MY_PROJECT_STATUS.ACTIVE
    : ENUM_ADV_MY_PROJECT_STATUS.FROZEN;
  const toStatus = frozen
    ? ENUM_ADV_MY_PROJECT_STATUS.FROZEN
    : ENUM_ADV_MY_PROJECT_STATUS.ACTIVE;

  // 1. Удалим проект из кеша вкладки, откуда он ушёл
  const baseParams = {
    status: fromStatus,
    language: language?.id,
    date_sort: dateSortingTypes.decrease,
  };
  dispatch(
    advProjectsAPI.util.updateQueryData(
      "getAdvProjects",
      baseParams as getProjectsCardReq,
      (draft: IAdvProjects) => {
        draft.projects = draft.projects.filter((el) => el.id !== project_id);
      },
    ),
  );

  // 2. Обновляем кэш вкладки, куда он пришёл
  const params = {
    status: toStatus,
    language: language?.id,
    date_sort: dateSortingTypes.decrease,
    page: 1,
    elements_on_page: INTERSECTION_ELEMENTS.ADV_PROJECTS,
    __isWebsocket: true,
  };

  await trigger(params).unwrap();

  // 3. Обновляем кэш кружочков
  dispatch(advProjectsAPI.util.invalidateTags([ADV_ORDERS, VIEWS_ADVERTISER]));
};
