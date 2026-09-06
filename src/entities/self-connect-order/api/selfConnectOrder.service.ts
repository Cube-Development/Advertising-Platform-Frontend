import { ExecutorType, MANAGE_EXECUTOR_TYPE_DEFAULT } from "@entities/admin";
import { ENUM_OFFER_STATUS } from "@entities/offer";
import { authApi } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { buildSelfConnectOrdersBody } from "../lib";
import { ISelfConnectOrdersResponse } from "../types";

export interface getSelfConnectOrdersReq {
  page: number;
  elements_on_page?: number;
  status: ENUM_OFFER_STATUS | string;
  search?: string | null;
  executor_type?: ExecutorType;
}

const getIsLast = (
  ordersLength: number,
  batchLength: number,
  pageSize: number,
  totalElements: number,
) => batchLength < pageSize || ordersLength >= totalElements;

export const selfConnectOrderAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getSelfConnectOrders: build.query<
      ISelfConnectOrdersResponse,
      getSelfConnectOrdersReq
    >({
      query: (req) => ({
        url: "/manage/self-connect-orders",
        method: "POST",
        body: buildSelfConnectOrdersBody(req),
      }),
      transformResponse: (response: ISelfConnectOrdersResponse, _meta, arg) => {
        const pageSize =
          arg?.elements_on_page ?? INTERSECTION_ELEMENTS.SELF_CONNECT_ORDERS;
        const batchLength = response?.orders?.length ?? 0;
        const accumulated = batchLength + (response?.page - 1) * pageSize;

        return {
          ...response,
          status: arg?.status,
          executor_type: arg?.executor_type ?? MANAGE_EXECUTOR_TYPE_DEFAULT,
          search: arg?.search ?? null,
          isLast:
            batchLength < pageSize || accumulated >= (response?.elements ?? 0),
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { status, search, executor_type } = queryArgs;
        return `${endpointName}/${status}/${executor_type ?? MANAGE_EXECUTOR_TYPE_DEFAULT}/${search?.trim() ?? ""}/`;
      },
      merge: (currentCache, newItems, arg) => {
        const pageSize =
          arg.arg.elements_on_page ?? INTERSECTION_ELEMENTS.SELF_CONNECT_ORDERS;
        const newMap = new Map(
          newItems?.orders?.map((order) => [order?.order_id, order]),
        );

        const updatedOld =
          currentCache?.orders?.map((old) =>
            newMap.has(old?.order_id) ? newMap.get(old.order_id)! : old,
          ) || [];

        const newIds = new Set(updatedOld.map((order) => order.order_id));
        const onlyNew =
          newItems?.orders?.filter((order) => !newIds.has(order.order_id)) ??
          [];

        if (arg.arg.page === 1) {
          return {
            ...newItems,
            isLast: getIsLast(
              newItems.orders?.length ?? 0,
              newItems.orders?.length ?? 0,
              pageSize,
              newItems.elements ?? 0,
            ),
          };
        }

        const orders = [...updatedOld, ...onlyNew];

        return {
          ...newItems,
          orders,
          isLast: getIsLast(
            orders.length,
            newItems.orders?.length ?? 0,
            pageSize,
            newItems.elements ?? 0,
          ),
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useGetSelfConnectOrdersQuery } = selfConnectOrderAPI;
