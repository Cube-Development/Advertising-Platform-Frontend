import {
  IAddChannelData,
  IAddChannelIdentification,
  IChannelBlogger,
  IEditChannelData,
  IReadChannelData,
  IReviewData,
  ENUM_CHANNEL_STATUS_BACKEND,
  ENUM_CHANNEL_STATUS,
  ratingData,
} from "@entities/channel";
import { dateSortingTypes } from "@entities/platform";
import {
  ADV_ORDERS,
  BLOGGER_CHANNELS,
  MANAGER_ORDERS,
  authApi,
} from "@shared/api";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { ENUM_LANGUAGES_NUM } from "@shared/languages";

export interface getChannelsByStatusReq {
  language: ENUM_LANGUAGES_NUM;
  page: number;
  date_sort: dateSortingTypes;
  elements_on_page?: number;
  status: ENUM_CHANNEL_STATUS | string;
  search_string?: string;
  channel_id?: string;
}

export interface getReviewsByIdReq {
  channel_id: string;
  grade_filter?: ratingData;
  last: string;
  elements_on_page: number;
}

export const channelAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    createCode: build.query<{ verification_code: number }, string>({
      query: () => ({
        url: `/channel/create/code`,
        method: `POST`,
      }),
    }),
    channelVerify: build.mutation<
      { insertion_code: string },
      IAddChannelIdentification
    >({
      query: (BodyParams) => ({
        url: `/channel/verify`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
    createChannel: build.mutation<
      { status: ENUM_CHANNEL_STATUS_BACKEND },
      IAddChannelData
    >({
      query: (BodyParams) => ({
        url: `/channel/create`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
    getChannelsByStatus: build.query<
      IChannelBlogger,
      getChannelsByStatusReq & { __isWebsocket?: boolean }
    >({
      query: (params) => ({
        url: "/channel/blogger",
        method: "GET",
        params: params,
      }),
      transformResponse: (response: IChannelBlogger, meta, arg) => {
        return {
          ...response,
          status: arg?.status,
          isLast:
            response?.elements ===
            response?.channels?.length +
              (response?.page - 1) * INTERSECTION_ELEMENTS.BLOGGER_CHANNELS,
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { language, date_sort, status } = queryArgs;
        return `${endpointName}/${language}/${date_sort}/${status}`;
      },
      merge: (currentCache: any, newItems, arg) => {
        const newIds = new Set(newItems.channels.map((p) => p?.id));
        const filteredOld = currentCache?.channels?.filter(
          ({ p }: any) => !newIds.has(p?.id),
        );

        if (arg.arg.__isWebsocket) {
          return {
            ...currentCache,
            channels: [...newItems.channels, ...filteredOld],
          };
        } else if (arg.arg.page === 1) {
          return {
            ...newItems,
          };
        }
        return {
          ...currentCache,
          channels: [...currentCache.channels, ...newItems.channels],
        };
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg !== previousArg;
      },
      providesTags: [BLOGGER_CHANNELS],
    }),
    getChannelById: build.query<
      IReadChannelData,
      {
        channel_id: string;
        language: ENUM_LANGUAGES_NUM;
        user_id?: string;
        guest_id?: string;
        project_id?: string;
      }
    >({
      query: (params) => ({
        url: "/channel-page/",
        method: "GET",
        params: params,
      }),
    }),
    getReviewsById: build.query<IReviewData, getReviewsByIdReq>({
      query: (params) => ({
        url: "/channel-page/reviews",
        method: "GET",
        params: params,
      }),
      // transformResponse: (response: IReviewData) => {
      //   return {
      //     ...response,
      //     isLast:
      //       response.reviews.length < INTERSECTION_ELEMENTS.CHANNEL_REVIEWS,
      //   };
      // },
      // serializeQueryArgs: ({ endpointName, queryArgs }) => {
      //   return `${endpointName}/${queryArgs.channel_id}`;
      // },
      // merge: (currentCache, newItems) => {
      //   return {
      //     ...newItems,
      //     reviews: [...currentCache.reviews, ...newItems.reviews],
      //   };
      // },
    }),
    activateChannel: build.mutation<void, string>({
      query: (channel_id) => ({
        url: `/channel/activate/${channel_id}`,
        method: `PUT`,
      }),
      invalidatesTags: [BLOGGER_CHANNELS],
    }),
    deactivateChannel: build.mutation<void, string>({
      query: (channel_id) => ({
        url: `/channel/deactivate/${channel_id}`,
        method: `PUT`,
      }),
      invalidatesTags: [BLOGGER_CHANNELS],
    }),
    editChannel: build.mutation<
      { status: ENUM_CHANNEL_STATUS_BACKEND },
      IEditChannelData
    >({
      query: (body) => ({
        url: "/channel/edit",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: [BLOGGER_CHANNELS],
    }),
    deleteChannel: build.mutation<void, { channel_id: string }>({
      query: (params) => ({
        url: `/channel/delete`,
        method: `DELETE`,
        params: params,
      }),
      invalidatesTags: [BLOGGER_CHANNELS],
    }),
    addReview: build.mutation<
      { success: boolean },
      { order_id: string; review?: string; grade: number }
    >({
      query: (params) => ({
        url: `/channel/review`,
        method: "PUT",
        params: params,
      }),
      invalidatesTags: [ADV_ORDERS, MANAGER_ORDERS],
    }),
  }),
});

export const {
  useCreateCodeQuery,
  useChannelVerifyMutation,
  useCreateChannelMutation,
  useGetChannelsByStatusQuery,
  useActivateChannelMutation,
  useDeactivateChannelMutation,
  useEditChannelMutation,
  useDeleteChannelMutation,
  useGetChannelByIdQuery,
  useGetReviewsByIdQuery,
  useAddReviewMutation,
} = channelAPI;
