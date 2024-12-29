import {
  chatType,
  IAllMessages,
  IChatData,
  IMessageNewSocket,
} from "@entities/communication";
import { roles } from "@entities/user";
import { authApi, CHAT } from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { convertUTCToLocalDateTime } from "@shared/utils/lib";

export interface getChatsReq {
  role: roles;
}

export interface readMessageReq {
  order_id?: string;
  project_id?: string;
  message_datetime: string;
}

export interface getChatHistoryReq {
  order_id?: string;
  project_id?: string;
  batch: number;
  message_date?: string;
  message_time?: string;
}

export const chatAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getOrderChats: build.query<IChatData[], getChatsReq>({
      query: (BodyParams) => {
        return {
          url: "/chat/order",
          method: "GET",
          params: BodyParams,
        };
      },
      transformResponse: (response: IChatData[]) => {
        const newResponse = response.map((item) => {
          const datetime = convertUTCToLocalDateTime(
            item.message_date,
            item.message_time,
          );
          return {
            ...item,
            type: chatType.order,
            formated_date: datetime.localDate,
            formated_time: datetime.localTime,
            message_datetime: item.message_date + " " + item.message_time,
            // unread_count: Math.floor(Math.random() * 10)
          };
        });
        return newResponse;
      },
      providesTags: [CHAT],
    }),

    getProjectChats: build.query<IChatData[], getChatsReq>({
      query: (BodyParams) => {
        return {
          url: "/chat/project",
          method: "GET",
          params: BodyParams,
        };
      },
      transformResponse: (response: IChatData[]) => {
        const newResponse = response.map((item) => {
          const datetime = convertUTCToLocalDateTime(
            item.message_date,
            item.message_time,
          );
          return {
            ...item,
            type: chatType.project,
            formated_date: datetime.localDate,
            formated_time: datetime.localTime,
            message_datetime: item.message_date + " " + item.message_time,
            // unread_count: Math.floor(Math.random() * 10)
          };
        });
        return newResponse;
      },
      providesTags: [CHAT],
    }),

    readOrderMessage: build.mutation<{ status: number }, readMessageReq>({
      query: (BodyParams) => ({
        url: `/chat/order/read`,
        method: `POST`,
        body: BodyParams,
      }),
    }),

    readProjectMessage: build.mutation<{ status: number }, readMessageReq>({
      query: (BodyParams) => ({
        url: `/chat/project/read`,
        method: `POST`,
        body: BodyParams,
      }),
    }),

    getOrderHistory: build.query<IAllMessages, getChatHistoryReq>({
      query: (BodyParams) => {
        return {
          url: "/chat/order/history",
          method: "GET",
          params: BodyParams,
        };
      },
      transformResponse: (response: IMessageNewSocket[]): IAllMessages => {
        const reversedArray = [...response].reverse();
        const newHistory = reversedArray.map((item) => {
          const datetime = convertUTCToLocalDateTime(
            item.message_date,
            item.message_time,
          );
          return {
            ...item,
            formated_date: datetime.localDate,
            formated_time: datetime.localTime,
            message_datetime: item.message_date + " " + item.message_time,
          };
        });
        return {
          history: newHistory,
          isLast: response.length !== INTERSECTION_ELEMENTS.chat,
        };
      },
      merge: (currentCache: IAllMessages, newItems: IAllMessages) => {
        const mergedHistory = [...newItems.history, ...currentCache.history];
        const uniqueHistory = mergedHistory
          .filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.id === item.id),
          )
          .sort(
            (a, b) =>
              new Date(a.message_datetime).getTime() -
              new Date(b.message_datetime).getTime(),
          );
        return {
          history: uniqueHistory,
          isLast: newItems.history.length !== INTERSECTION_ELEMENTS.chat,
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { order_id } = queryArgs;
        return `${endpointName}/${order_id}`;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: [CHAT],
    }),

    getProjectHistory: build.query<IAllMessages, getChatHistoryReq>({
      query: (BodyParams) => {
        return {
          url: "/chat/project/history",
          method: "GET",
          params: BodyParams,
        };
      },
      transformResponse: (response: IMessageNewSocket[]): IAllMessages => {
        const reversedArray = [...response].reverse();
        const newHistory = reversedArray.map((item) => {
          const datetime = convertUTCToLocalDateTime(
            item.message_date,
            item.message_time,
          );
          return {
            ...item,
            formated_date: datetime.localDate,
            formated_time: datetime.localTime,
            message_datetime: item.message_date + " " + item.message_time,
          };
        });
        return {
          history: newHistory,
          isLast: response.length !== INTERSECTION_ELEMENTS.chat,
        };
      },
      merge: (currentCache: IAllMessages, newItems: IAllMessages) => {
        const mergedHistory = [...newItems.history, ...currentCache.history];
        const uniqueHistory = mergedHistory
          .filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.id === item.id),
          )
          .sort(
            (a, b) =>
              new Date(a.message_datetime).getTime() -
              new Date(b.message_datetime).getTime(),
          );
        return {
          history: uniqueHistory,
          isLast: newItems.history.length !== INTERSECTION_ELEMENTS.chat,
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { project_id } = queryArgs;
        return `${endpointName}/${project_id}`;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: [CHAT],
    }),
  }),
});

export const {
  useReadOrderMessageMutation,
  useReadProjectMessageMutation,
  useGetOrderChatsQuery,
  useGetProjectChatsQuery,
  useGetOrderHistoryQuery,
  useGetProjectHistoryQuery,
} = chatAPI;
