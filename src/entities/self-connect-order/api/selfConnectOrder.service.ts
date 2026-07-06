import { authApi } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import {
  ENUM_OFFER_STATUS,
  SELF_CONNECT_ORDER_STATUS_API,
} from "@entities/offer";
import { ISelfConnectOrdersResponse } from "../types";

export interface getSelfConnectOrdersReq {
  page: number;
  elements_on_page?: number;
  status: ENUM_OFFER_STATUS | string;
}

const getIsLast = (
  ordersLength: number,
  batchLength: number,
  pageSize: number,
  totalElements: number,
) =>
  batchLength < pageSize || ordersLength >= totalElements;

export const selfConnectOrderAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getSelfConnectOrders: build.query<
      ISelfConnectOrdersResponse,
      getSelfConnectOrdersReq
    >({
      query: ({ status, page, elements_on_page }) => ({
        url: "/manage/self-connect-orders",
        method: "POST",
        body: {
          page,
          elements_on_page,
          status:
            SELF_CONNECT_ORDER_STATUS_API[
              status as keyof typeof SELF_CONNECT_ORDER_STATUS_API
            ],
        },
      }),
      transformResponse: (
        response: ISelfConnectOrdersResponse,
        _meta,
        arg,
      ) => {
        const pageSize =
          arg?.elements_on_page ?? INTERSECTION_ELEMENTS.SELF_CONNECT_ORDERS;
        const batchLength = response?.orders?.length ?? 0;
        const accumulated =
          batchLength + (response?.page - 1) * pageSize;

        return {
          ...response,
          status: arg?.status,
          isLast:
            batchLength < pageSize || accumulated >= (response?.elements ?? 0),
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { status } = queryArgs;
        return `${endpointName}/${status}/`;
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
