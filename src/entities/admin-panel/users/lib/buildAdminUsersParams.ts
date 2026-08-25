import { IGetAdminUsersReq } from "../types";

export type AdminUsersParams = {
  elements_on_page: number;
  last?: string;
  search?: string;
  status?: IGetAdminUsersReq["status"];
};

export const buildAdminUsersParams = (
  req: IGetAdminUsersReq,
): AdminUsersParams => ({
  elements_on_page: req.elements_on_page,
  ...(req.last ? { last: req.last } : {}),
  ...(req.search?.trim() ? { search: req.search.trim() } : {}),
  ...(req.status !== undefined ? { status: req.status } : {}),
});
