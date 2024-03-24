import { createApi } from "@reduxjs/toolkit/query/react";
import authBaseQuery from "./authBaseQuery";
import { UUID } from "crypto";
import { IProfileData } from "@shared/types/profile";
import { profileTypesName } from "@shared/config/profileFilter";

type CreateLegalResponse = IProfileData & {
  user_id: UUID;
  legal_id: UUID;
};
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
type ReadLegalsByType = {
  [key in profileTypesName]: {
    legal_id: string;
    type_legal: number;
    name: string;
    INN?: number;
    PNFL?: number;
  }[];
};

export const legalAPI = createApi({
  reducerPath: "legalAPI",
  baseQuery: authBaseQuery,
  endpoints: (build) => ({
    createLegal: build.mutation<CreateLegalResponse, IProfileData>({
      query: (BodyParams) => ({
        url: `/legal/create`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
    editLegal: build.mutation<CreateLegalResponse, IProfileData>({
      query: (BodyParams) => ({
        url: `/legal/edit`,
        method: `PUT`,
        body: BodyParams,
      }),
    }),
    deleteLegal: build.query<DeleteLegalResponse, UUID>({
      query: (legal_id) => `/legal/delete/${legal_id}`,
    }),
    readLegalsByType: build.query<ReadLegalsByType, number>({
      query: (type_legal) => `/legal/read/?type_legal=${type_legal}`,
    }),
    readOneLegal: build.query<CreateLegalResponse, UUID>({
      query: (legal_id) => `/legal/read/${legal_id}`,
    }),
  }),
});
