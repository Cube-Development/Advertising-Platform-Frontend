import {
  ExecutorType,
  MANAGE_EXECUTOR_TYPE_DEFAULT,
} from "../../admin/config/executorType";
import {
  ENUM_OFFER_STATUS,
  SELF_CONNECT_ORDER_STATUS_API,
} from "../../offer/config/offerStatus";

export type BuildSelfConnectOrdersInput = {
  page: number;
  elements_on_page?: number;
  status: ENUM_OFFER_STATUS | string;
  search?: string | null;
  executor_type?: ExecutorType;
};

export type SelfConnectOrdersBody = {
  page: number;
  elements_on_page?: number;
  status: number[];
  search?: string;
  executor_type: ExecutorType;
};

export const buildSelfConnectOrdersBody = (
  req: BuildSelfConnectOrdersInput,
): SelfConnectOrdersBody => {
  const statusKey = req.status as keyof typeof SELF_CONNECT_ORDER_STATUS_API;
  const status =
    SELF_CONNECT_ORDER_STATUS_API[statusKey] ??
    SELF_CONNECT_ORDER_STATUS_API[ENUM_OFFER_STATUS.ACTIVE];

  return {
    page: req.page,
    ...(req.elements_on_page !== undefined
      ? { elements_on_page: req.elements_on_page }
      : {}),
    status,
    ...(req.search?.trim() ? { search: req.search.trim() } : {}),
    executor_type: req.executor_type ?? MANAGE_EXECUTOR_TYPE_DEFAULT,
  };
};
