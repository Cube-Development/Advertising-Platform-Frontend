import { AppDispatch } from "@app/providers/store";
import { dateSortingTypes } from "@entities/platform";
import { ILanguage } from "@shared/languages";
import { advProjectsAPI, getProjectsCardReq } from "../api";
import { advManagerProjectStatusFilter, projectStatus } from "../config";
import { IAdvProjects } from "../types";

interface Props {
  project_id: string;
  dispatch: AppDispatch;
  language: ILanguage;
}

export const invalidateAdvProjectByDesire = ({
  project_id,
  dispatch,
  language,
}: Props) => {
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
        draft.projects = draft.projects.map((el) => {
          if (el.id === project_id) {
            el.is_request_approve = projectStatus.changed;
          }
          return el;
        });
      },
    ),
  );
};
