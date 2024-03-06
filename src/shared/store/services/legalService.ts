import { createApi } from "@reduxjs/toolkit/query/react";
import authBaseQuery from "./authBaseQuery";

type CreateLegalParams = {
  type_legal: number;
  name: string;
  address: string;
  INN: number;
  checking_account: string;
  bank_name: string;
  bank_mfo: number;
  phone: string;
  email: string;
  PNFL: number;
  registration_number: number;
  registration_date: string;
  transit_account: string;
  card_number: number;
  card_date_year: number;
  card_date_month: number;
};
type CreateLegalResponse = {
  user_id: string;
  legal_id: string;
  type_legal: number;
  name: string;
  address: string;
  INN: number;
  checking_account: string;
  bank_name: string;
  bank_mfo: number;
  phone: string;
  email: string;
  PNFL: number;
  registration_number: number;
  registration_date: string;
  transit_account: string;
  card_number: number;
  card_date_year: number;
  card_date_month: number;
};

export const legalAPI = createApi({
  reducerPath: "legalAPI",
  baseQuery: authBaseQuery,
  endpoints: (build) => ({
    createLegal: build.mutation<CreateLegalResponse, CreateLegalParams>({
      query: (BodyParams) => ({
        url: `/legal/create`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
  }),
});
