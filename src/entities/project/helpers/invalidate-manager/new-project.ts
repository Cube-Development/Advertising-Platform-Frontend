import { AppDispatch } from "@app/providers/store";
import { dateSortingTypes } from "@entities/platform";
import { VIEWS_MANAGER } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ILanguage, USER_LANGUAGES_LIST } from "@shared/languages";
import { managerProjectsAPI } from "../../api";
import { ENUM_MANAGER_PROJECT_STATUS } from "../../config";

interface Props {
  dispatch: AppDispatch;
  trigger: ReturnType<
    typeof managerProjectsAPI.useLazyGetManagerProjectsQuery
  >[0];
  language: ILanguage;
}

export const invalidateManagerNewProject = async ({
  dispatch,
  trigger,
  language = USER_LANGUAGES_LIST[0],
}: Props) => {
  // 1. Получаем page=1
  const params = {
    page: 1,
    elements_on_page: INTERSECTION_ELEMENTS.MANAGER_PROJECTS,
    language: language?.id,
    date_sort: dateSortingTypes.decrease,
    status: ENUM_MANAGER_PROJECT_STATUS.NEW,
    __isWebsocket: true,
  };

  await trigger(params).unwrap();

  // 2. Обновляем кэш кружочков
  dispatch(managerProjectsAPI.util.invalidateTags([VIEWS_MANAGER]));
};
