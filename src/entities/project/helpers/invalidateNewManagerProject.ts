import { AppDispatch } from "@app/providers/store";
import { dateSortingTypes } from "@entities/platform";
import { VIEWS_MANAGER } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ILanguage, USER_LANGUAGES_LIST } from "@shared/languages";
import { getManagerProjectsCardReq, managerProjectsAPI } from "../api";
import { managerProjectStatusFilter } from "../config";
import { IManagerNewProjects } from "../types";
import { ENUM_ROLES } from "@entities/user";

interface Props {
  dispatch: AppDispatch;
  trigger: ReturnType<
    typeof managerProjectsAPI.useLazyGetManagerProjectsQuery
  >[0];
  language: ILanguage;
  role: ENUM_ROLES;
}

export const invalidateNewManagerProject = async ({
  dispatch,
  trigger,
  language = USER_LANGUAGES_LIST[0],
  role,
}: Props) => {
  if (role !== ENUM_ROLES.MANAGER) return;

  try {
    // 1. Получаем page=1
    const elements = INTERSECTION_ELEMENTS.MANAGER_ORDERS;
    const params: getManagerProjectsCardReq = {
      page: 1,
      elements_on_page: elements,
      language: language?.id,
      date_sort: dateSortingTypes.decrease,
      status: managerProjectStatusFilter.new,
    };

    const result: IManagerNewProjects = await trigger(params).unwrap();

    // 2. Обновляем общий кэш, сравнивая первые N элементов
    // dispatch(
    //   managerProjectsAPI.util.updateQueryData(
    //     "getManagerProjects",
    //     {
    //       status: managerProjectStatusFilter.new,
    //     } as getManagerProjectsCardReq, // ключ кэша, т.к. serializeQueryArgs без page
    //     (draft: IManagerNewProjects) => {
    //       const existingIds = new Set(draft.projects.map((el) => el.id));
    //       const toAdd = result.projects.filter((el) => !existingIds.has(el.id));

    //       if (toAdd.length === 0) return;

    //       draft.projects.unshift(...toAdd);

    //       // очистка дубликатов
    //       const seen = new Set<string>();
    //       draft.projects = draft.projects.filter((el) => {
    //         if (seen.has(el.id)) return false;
    //         seen.add(el.id);
    //         return true;
    //       });
    //     },
    //   ),
    // );

    // 3. Обновляем кэш кружочков
    dispatch(managerProjectsAPI.util.invalidateTags([VIEWS_MANAGER]));
  } catch (err) {
    console.error("ERROR: INVALIDATE NEW MANAGER PROJECT - ", err);
  }
};
