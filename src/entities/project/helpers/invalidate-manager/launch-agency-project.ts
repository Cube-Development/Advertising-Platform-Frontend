import { AppDispatch } from "@app/providers/store";
import { AGENCY_PROJECTS_MANAGER } from "@shared/api";
import {
  IGetAgencyProjectsReq,
  IGetAgencyProjectsRes,
  agencyAuthAPI,
} from "../../api";
import { ENUM_MANAGER_PROJECT_STATUS } from "../../config";

interface Props {
  dispatch: AppDispatch;
  project_id: string;
}

export const invalidateManagerAgencyProjectByLaunchProject = async ({
  dispatch,
  project_id,
}: Props) => {
  const baseParams = {
    status: ENUM_MANAGER_PROJECT_STATUS.REQUEST_APPROVE,
  };

  // 1. Удалим проект (если он там есть) из кеша проектов в разработке
  dispatch(
    agencyAuthAPI.util.updateQueryData(
      "getAgencyProjects",
      baseParams as IGetAgencyProjectsReq,
      (draft: IGetAgencyProjectsRes) => {
        draft.projects = draft.projects.filter((el) => el.id !== project_id);
      },
    ),
  );

  // 2. Обновляем кэш кружочков
  dispatch(agencyAuthAPI.util.invalidateTags([AGENCY_PROJECTS_MANAGER]));
};
