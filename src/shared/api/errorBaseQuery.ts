import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { errorStore } from "./errorStore";

/**
 * A wrapper for fetchBaseQuery that intercepts all errors
 * and adds them to the global errorStore for the debug overlay.
 */
export const errorBaseQuery = (
  baseUrl: string,
  credentials?: "include" | "omit" | "same-origin",
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials,
  });

  return async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error) {
      const isArgsObj = typeof args !== "string";
      const errorData = result.error.data;
      const fetchError = (result.error as any).error;
      const status = result.error.status;

      let message = "Unknown error";
      if (errorData) {
        message = JSON.stringify(errorData);
      } else if (status === "FETCH_ERROR") {
        message = "Network error or CORS block (check browser console)";
      } else if (status === "TIMEOUT_ERROR") {
        message = "Request timed out";
      } else if (status === "PARSING_ERROR") {
        message = "Failed to parse server response";
      } else if (fetchError) {
        message = fetchError;
      }

      errorStore.addError({
        status: status,
        message: message,
        time: new Date().toLocaleTimeString(),
        url: isArgsObj ? args.url : args,
        params: isArgsObj ? args.params : undefined,
        body: isArgsObj ? args.body : undefined,
        raw: result.error,
      });
    }

    return result;
  };
};
