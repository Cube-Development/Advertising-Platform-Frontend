import {
  IAddChannelData,
  IAddChannelIdentification,
  IChannelBlogger,
  IEditChannelData,
  IReadChannelData,
  IReviewData,
  channelStatus,
  channelStatusFilter,
} from "@entities/channel";
import { platformTypesNum } from "@entities/platform";
import { BLOGGER_CHANNELS, authApi } from "@shared/api";
import { INTERSECTION_ELEMENTS, languagesNum } from "@shared/config";

export interface getChannelsByStatusReq {
  platform: platformTypesNum;
  language: languagesNum;
  page: number;
  date_sort: string;
  elements_on_page?: number;
  status: channelStatusFilter | string;
}

export interface getReviewsByIdReq {
  channel_id: string;
  grade_filter?: number;
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
    createChannel: build.mutation<{ status: channelStatus }, IAddChannelData>({
      query: (BodyParams) => ({
        url: `/channel/create`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
    getChannelsByStatus: build.query<IChannelBlogger, getChannelsByStatusReq>({
      query: (params) => ({
        url: "/channel/blogger",
        method: "GET",
        params: params,
      }),
      transformResponse: (response: IChannelBlogger, meta, arg) => {
        return {
          ...response,
          status: arg?.status,
          isLast: response.channels.length !== INTERSECTION_ELEMENTS.myChannels,
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { platform, language, date_sort, status } = queryArgs;
        return `${endpointName}/${platform}/${language}/${date_sort}/${status}`;
      },
      merge: (currentCache: any, newItems, arg) => {
        if (arg.arg.page === 1) {
          return {
            ...newItems,
            status: arg.arg.status,
            isLast:
              newItems.channels.length !== INTERSECTION_ELEMENTS.myChannels,
          };
        }
        return {
          ...currentCache,
          channels: [...currentCache.channels, ...newItems.channels],
          status: arg.arg.status,
          isLast: newItems.channels.length !== INTERSECTION_ELEMENTS.myChannels,
        };
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.page !== previousArg?.page;
      },
      providesTags: [BLOGGER_CHANNELS],
    }),
    getChannelById: build.query<
      IReadChannelData,
      {
        channel_id: string;
        language: languagesNum;
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
      transformResponse: (response: IReviewData) => {
        return {
          ...response,
          isLast:
            response.reviews.length !== INTERSECTION_ELEMENTS.channelReview,
        };
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        return {
          ...newItems,
          reviews: [...currentCache.reviews, ...newItems.reviews],
          isLast:
            newItems.reviews.length !== INTERSECTION_ELEMENTS.channelReview,
        };
      },
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
    editChannel: build.mutation<{ status: channelStatus }, IEditChannelData>({
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
