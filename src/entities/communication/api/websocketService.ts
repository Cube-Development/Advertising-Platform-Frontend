import { authApi } from "@shared/api";

export const websocketAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getAuthToken: build.mutation<{ token: string }, void>({
      query: () => ({
        url: "/auth/authentication",
        method: "POST",
      }),
    }),
    getWebsocketToken: build.mutation<{ token: string }, { channel: string }>({
      query: (BodyParams) => ({
        url: "/auth/subscription",
        method: "POST",
        body: BodyParams,
      }),
    }),
  }),
});

export const { useGetAuthTokenMutation, useGetWebsocketTokenMutation } =
  websocketAPI;
