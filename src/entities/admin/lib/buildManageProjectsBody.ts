import {
  ExecutorType,
  MANAGE_EXECUTOR_TYPE_DEFAULT,
} from "../config/executorType";

export type BuildManageProjectsInput = {
  page: number;
  elements_on_page: number;
  status: number[];
  project_id?: string;
  url?: string;
  executor_type?: ExecutorType;
};

export type ManageProjectsBody = {
  page: number;
  elements_on_page: number;
  status: number[];
  project_id?: string;
  url?: string;
  executor_type: ExecutorType;
};

export const buildManageProjectsBody = (
  req: BuildManageProjectsInput,
): ManageProjectsBody => ({
  page: req.page,
  elements_on_page: req.elements_on_page,
  status: req.status,
  ...(req.project_id ? { project_id: req.project_id } : {}),
  ...(req.url ? { url: req.url } : {}),
  executor_type: req.executor_type ?? MANAGE_EXECUTOR_TYPE_DEFAULT,
});
