import { authApi } from "@shared/api";
import { INotifications } from "../types";
import { INTERSECTION_ELEMENTS } from "@shared/config";

export interface getNotificationsReq {
  page: number;
  elements_on_page: number;
}

export const notificationsAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<INotifications, getNotificationsReq>({
      query: (params) => ({
        url: "/notification/",
        method: "GET",
        params: params,
      }),
      transformResponse: (response: INotifications) => {
        return {
          ...response,
          isLast:
            response.notifications.length !==
            INTERSECTION_ELEMENTS.notifications,
        };
      },
      merge: (currentCache, newItems) => {
        return {
          ...newItems,
          notifications: [
            ...currentCache.notifications,
            ...newItems.notifications,
          ],
          isLast:
            newItems.notifications.length !==
            INTERSECTION_ELEMENTS.notifications,
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    readNotification: build.mutation<
      { success: boolean },
      { notification_id: string }
    >({
      query: (params) => ({
        url: `/notification/read`,
        method: "PUT",
        params: params,
      }),
    }),
  }),
});

export const { useGetNotificationsQuery, useReadNotificationMutation } =
  notificationsAPI;
