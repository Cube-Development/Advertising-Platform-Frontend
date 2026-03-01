import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logout, logoutEcp } from "@entities/user";
import { errorStore } from "@shared/api/errorStore";

const baseUrl = `${import.meta.env.VITE_BASE_URL}`;

export const authBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl,
    credentials: "include",
  });

  // Выполняем базовый запрос
  const result = await baseQuery(args, api, extraOptions);

  // Перехватываем ошибки для отладочного оверлея
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

  // Проверяем на 401 ошибку
  if (result.error && result.error.status === 401) {
    // Отправляем POST запрос на /auth/logout без авторизации
    try {
      await fetch(`${baseUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      // Игнорируем ошибки при отправке логаута
    }

    // Вызов логаута
    api.dispatch(logout());
    api.dispatch(logoutEcp());
  }

  return result;
};
