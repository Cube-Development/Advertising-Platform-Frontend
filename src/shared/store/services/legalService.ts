import { createApi } from "@reduxjs/toolkit/query/react";
import authBaseQuery from "./authBaseQuery";
import {
  IProfileData,
  ILegalCard,
  ILegalCardShort,
} from "@shared/types/profile";
import { profileTypesNum } from "@shared/config/profileFilter";

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

export const legalAPI = createApi({
  reducerPath: "legalAPI",
  baseQuery: authBaseQuery,
  endpoints: (build) => ({
    createLegal: build.mutation<ILegalCard, IProfileData>({
      query: (BodyParams) => ({
        url: `/legal/create`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
    editLegal: build.mutation<ILegalCard, IProfileData>({
      query: (BodyParams) => ({
        url: `/legal/edit`,
        method: `PUT`,
        body: BodyParams,
      }),
    }),
    deleteLegal: build.query<DeleteLegalResponse, string>({
      query: (legal_id) => `/legal/delete/${legal_id}`,
    }),
    readLegalsByType: build.query<
      ILegalCardShort[],
      profileTypesNum | undefined
    >({
      query: (type_legal) => `/legal/read/?type_legal=${type_legal}`,
    }),
    readOneLegal: build.mutation<ILegalCard, string>({
      query: (legal_id) => `/legal/read/${legal_id}`,
    }),
  }),
});
