import {
  IOrderMessageAll,
  IOrderMessageNewSocket,
} from "@entities/communication";
import { roles } from "@entities/user";
import { authApi } from "@shared/api";
import { CHAT } from "@shared/api/tags";

export interface getChatsReq {
  role: roles;
}

export interface getChatHistoryReq {
  order_id?: string;
  project_id?: string;
  batch: number;
  message_date: string;
  message_time: string;
}

export const chatAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getOrderChats: build.query<IOrderMessageAll[], getChatsReq>({
      query: (BodyParams) => {
        console.log(BodyParams);
        return {
          url: "/chat/order",
          method: "GET",
          params: BodyParams,
        };
      },
      providesTags: [CHAT],
    }),

    getProjectChats: build.query<IOrderMessageAll[], getChatsReq>({
      query: (BodyParams) => {
        console.log(BodyParams);
        return {
          url: "/chat/project",
          method: "GET",
          params: BodyParams,
        };
      },
      providesTags: [CHAT],
    }),

    getOrderHistory: build.query<IOrderMessageNewSocket[], getChatHistoryReq>({
      query: (BodyParams) => {
        console.log(BodyParams);
        return {
          url: "/chat/order/history",
          method: "GET",
          params: BodyParams,
        };
      },
      providesTags: [CHAT],
    }),

    getProjectHistory: build.query<IOrderMessageNewSocket[], getChatHistoryReq>(
      {
        query: (BodyParams) => {
          console.log(BodyParams);
          return {
            url: "/chat/project/history",
            method: "GET",
            params: BodyParams,
          };
        },
        providesTags: [CHAT],
      },
    ),
  }),
});

export const {
  useGetOrderChatsQuery,
  useGetProjectChatsQuery,
  useGetOrderHistoryQuery,
  useGetProjectHistoryQuery,
} = chatAPI;
