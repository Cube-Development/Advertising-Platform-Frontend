import {
  CHANNELS_EXECUTOR_TYPE_DEFAULT,
  ExecutorType,
} from "../../../admin/config/executorType";
import { IGetAdminChannelsReq } from "../types";

export type AdminChannelsParams = {
  page: number;
  status: IGetAdminChannelsReq["status"];
  elements_on_page: number;
  search_string?: string;
  executor_type: ExecutorType;
};

export const buildAdminChannelsParams = (
  req: IGetAdminChannelsReq,
): AdminChannelsParams => ({
  page: req.page,
  status: req.status,
  elements_on_page: req.elements_on_page,
  ...(req.search_string?.trim()
    ? { search_string: req.search_string.trim() }
    : {}),
  executor_type: req.executor_type ?? CHANNELS_EXECUTOR_TYPE_DEFAULT,
});
