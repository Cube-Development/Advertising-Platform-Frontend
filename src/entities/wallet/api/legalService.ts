import {
  ILegalCard,
  ILegalCardShort,
  ILegalData,
  PROFILE_STATUS,
} from "@entities/wallet";
import { authApi, LEGALS } from "@shared/api";

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
    createLegal: build.mutation<ILegalCard, ILegalData>({
      query: (BodyParams) => ({
        url: `/legal/create`,
        method: `POST`,
        body: BodyParams,
      }),
      invalidatesTags: [LEGALS],
    }),
    editLegal: build.mutation<ILegalCard, ILegalData>({
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
      PROFILE_STATUS | undefined
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
