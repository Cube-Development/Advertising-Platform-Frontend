import { authApi } from "@shared/api";

export const websocketAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getWebsocketToken: build.query({
      query: (BodyParams) => (
        console.log(BodyParams),
        {
          url: "/auth/subscription",
          method: "POST",
          body: BodyParams,
        }
      ),
      // providesTags: [CHAT],
    }),
  }),
});

export const { useGetWebsocketTokenQuery } = websocketAPI;
