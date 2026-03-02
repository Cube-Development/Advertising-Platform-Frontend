import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logout, logoutEcp } from "@entities/user";
import { errorBaseQuery } from "@shared/api/errorBaseQuery";

const baseUrl = `${import.meta.env.VITE_BASE_URL}`;

export const authBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = errorBaseQuery(baseUrl, "include");
  
  const result = await baseQuery(args, api, extraOptions);
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
