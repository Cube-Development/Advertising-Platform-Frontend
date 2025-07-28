import { authApi, MY_ORGANIZATION } from "@shared/api";
import {
  IGetMyOrganizationResponse,
  ICreateOrganizationRequest,
} from "../types";

export const organizationAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    getOrganization: build.query<IGetMyOrganizationResponse, void>({
      query: () => ({
        url: `/organization/`,
        method: `GET`,
      }),
      providesTags: [MY_ORGANIZATION],
    }),
    createOrganization: build.mutation<
      IGetMyOrganizationResponse,
      ICreateOrganizationRequest
    >({
      query: (body) => ({
        url: `/organization/`,
        method: `POST`,
        body,
      }),
      invalidatesTags: [MY_ORGANIZATION],
    }),
    checkOfferSigned: build.mutation<{ success: boolean }, void>({
      query: () => ({
        url: `/organization/offer/sign`,
        method: `POST`,
      }),
      invalidatesTags: [MY_ORGANIZATION],
    }),
  }),
});

export const {
  useGetOrganizationQuery,
  useCreateOrganizationMutation,
  useCheckOfferSignedMutation,
} = organizationAPI;
