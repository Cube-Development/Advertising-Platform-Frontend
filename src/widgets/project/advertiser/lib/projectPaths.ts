import { ENUM_PATHS } from "@shared/routing";
import { buildPathWithQuery, queryParamKeys } from "@shared/utils";

interface IProjectPathParams {
  projectId: string;
  projectType?: string | null;
  projectStatus?: string | null;
}

const withQuery = (
  path: string,
  { projectId, projectType, projectStatus }: IProjectPathParams,
) =>
  buildPathWithQuery(path.replace(":project_id", projectId), {
    [queryParamKeys.projectType]: projectType,
    [queryParamKeys.projectStatus]: projectStatus,
  });

/** Страница проекта: тип и вкладка нужны, чтобы найти проект в списке своего статуса */
export const getProjectPagePath = (params: IProjectPathParams) =>
  withQuery(ENUM_PATHS.PROJECT_PAGE, params);

/** Страница отчёта проекта — только у «Моих проектов» */
export const getProjectReportPath = (params: IProjectPathParams) =>
  withQuery(ENUM_PATHS.PROJECT_REPORT, params);

/** Список проектов на ту же вкладку */
export const getProjectsListPath = ({
  projectType,
  projectStatus,
}: Omit<IProjectPathParams, "projectId">) =>
  buildPathWithQuery(ENUM_PATHS.ORDERS, {
    [queryParamKeys.projectType]: projectType,
    [queryParamKeys.projectStatus]: projectStatus,
  });
