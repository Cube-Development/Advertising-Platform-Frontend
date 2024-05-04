import {
  IProfileData,
  ILegalCard,
  ILegalCardShort,
} from "@shared/types/profile";
import { profileTypesNum } from "@shared/config/profileFilter";
import { authApi } from "@shared/api";
import { LEGALS } from "@shared/api/tags";

type DeleteLegalResponse = {
  success?: boolean;
  detail?: [
    {
      loc: ["string"];
      msg: "string";
      type: "string";
    },
  ];
};

export const legalAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    createLegal: build.mutation<ILegalCard, IProfileData>({
      query: (BodyParams) => ({
        url: `/legal/create`,
        method: `POST`,
        body: BodyParams,
      }),
      invalidatesTags: [LEGALS],
    }),
    editLegal: build.mutation<ILegalCard, IProfileData>({
      query: (BodyParams) => ({
        url: `/legal/edit`,
        method: `PUT`,
        body: BodyParams,
      }),
      invalidatesTags: [LEGALS],
    }),
    deleteLegal: build.mutation<DeleteLegalResponse, string>({
      query: (legal_id) => `/legal/delete/${legal_id}`,
      invalidatesTags: [LEGALS],
    }),
    readLegalsByType: build.query<
      ILegalCardShort[],
      profileTypesNum | undefined
    >({
      query: (type_legal) => `/legal/read/?type_legal=${type_legal}`,
      providesTags: [LEGALS],
    }),
    readOneLegal: build.mutation<ILegalCard, string>({
      query: (legal_id) => `/legal/read/${legal_id}`,
    }),
  }),
});
export const {
  useCreateLegalMutation,
  useEditLegalMutation,
  useDeleteLegalMutation,
  useReadLegalsByTypeQuery,
  useReadOneLegalMutation,
} = legalAPI;
