import { AppDispatch } from "@app/providers/store";
import { dateSortingTypes } from "@entities/platform";
import { ENUM_ROLES } from "@entities/user";
import { ADV_ORDERS, VIEWS_ADVERTISER } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ILanguage, USER_LANGUAGES_LIST } from "@shared/languages";
import { advProjectsAPI, getProjectsCardReq } from "../../api";
import { myProjectStatusFilter } from "../../config";
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

export const invalidateAdvProjectByBloggerAction = async ({
  dispatch,
  trigger,
  language = USER_LANGUAGES_LIST[0],
  project_id,
  role,
}: Props) => {
  if (role !== ENUM_ROLES.ADVERTISER) return;

  let page: number | null = null;

  const baseParams = {
    status: myProjectStatusFilter.active,
    language: language?.id,
    date_sort: dateSortingTypes.decrease,
  };

  // 1. Найдём страницу в кеше моих проектов активные, где лежит project_id
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
  await trigger({
    ...baseParams,
    elements_on_page: INTERSECTION_ELEMENTS.ADV_ORDERS,
    page,
    __isWebsocket: true,
  }).unwrap();

  // 3. Обновляем кэш кружочков и ордеров
  dispatch(advProjectsAPI.util.invalidateTags([ADV_ORDERS, VIEWS_ADVERTISER]));
};
