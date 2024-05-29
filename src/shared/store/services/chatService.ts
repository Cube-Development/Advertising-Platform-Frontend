import { authApi } from "@shared/api";
import { CHAT } from "@shared/api/tags";
import { IOrderMessageAll, IOrderMessageNewSocket } from "@shared/types/chat";

export const chatAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getAllChats: build.query<IOrderMessageAll[], any>({
      query: (BodyParams) => {
        console.log(BodyParams);
        return {
          url: "/chat/order",
          method: "GET",
          params: BodyParams, // Используйте 'params' для передачи параметров запроса
        };
      },
      providesTags: [CHAT],
    }),

    getChatHistory: build.query<IOrderMessageNewSocket[], any>({
      query: (BodyParams) => {
        console.log(BodyParams);
        return {
          url: "/chat/order/history",
          method: "GET",
          params: BodyParams, // Используйте 'params' для передачи параметров запроса
        };
      },
      providesTags: [CHAT],
    }),
  }),
});

export const { useGetAllChatsQuery, useGetChatHistoryQuery } = chatAPI;
