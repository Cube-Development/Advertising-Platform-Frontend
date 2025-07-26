import { DIGITAL_DOCUMENTS } from "@shared/api/epc";
import { authEcpApi } from "@shared/api/epc/authApi";
import {
  ENUM_DOCUMENT_TYPE,
  ICreateDocumentEDORequest,
  IGetDocumentEDORequest,
  IGetDocumentEDOResponse,
  IGetDocumentEDOToSignResponse,
} from "../types";

export const documentAPI = authEcpApi.injectEndpoints({
  endpoints: (build) => ({
    getDocumentsEDO: build.query<
      IGetDocumentEDOResponse,
      IGetDocumentEDORequest
    >({
      query: (params) => ({
        url: `/v2/documents`,
        method: `GET`,
        params: params,
      }),
      transformResponse: (response: IGetDocumentEDOResponse, meta, arg) => {
        return {
          ...response,
          status: arg?.status,
          isLast: !response?.next_page_url,
        };
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { status } = queryArgs;
        return `${endpointName}/${status}`;
      },
      merge: (
        currentCache: IGetDocumentEDOResponse,
        newItems: IGetDocumentEDOResponse,
        arg,
      ) => {
        if (arg.arg.page === 1) {
          return {
            ...newItems,
          };
        }

        return {
          ...newItems,
          data: [...currentCache.data, ...newItems.data],
        };
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      providesTags: [DIGITAL_DOCUMENTS],
    }),
    getSignInfoEDO: build.mutation<
      IGetDocumentEDOToSignResponse,
      { documentId: string }
    >({
      query: ({ documentId }) => ({
        url: `/v1/documents/${documentId}?owner=1`,
        method: `GET`,
      }),
    }),
    createDocumentEDO: build.mutation<
      any,
      {
        data: ICreateDocumentEDORequest;
        type: ENUM_DOCUMENT_TYPE;
        lang: string;
      }
    >({
      query: ({ data, type, lang }) => ({
        url: `/v1/documents/${type}/create/${lang}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [DIGITAL_DOCUMENTS],
    }),
    createSignEDO: build.mutation<
      any,
      { documentId: string; signature: string }
    >({
      query: ({ documentId, signature }) => ({
        url: `/v1/documents/${documentId}/sign`,
        method: "POST",
        body: { signature },
      }),
      invalidatesTags: [DIGITAL_DOCUMENTS],
    }),
  }),
});

export const {
  useGetDocumentsEDOQuery,
  useCreateDocumentEDOMutation,
  useGetSignInfoEDOMutation,
  useCreateSignEDOMutation,
} = documentAPI;
