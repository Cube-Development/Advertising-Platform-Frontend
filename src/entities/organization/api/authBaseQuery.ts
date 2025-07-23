import { logoutEcp } from "@entities/user";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import Cookies from "js-cookie";

const baseUrl = "https://api2.didox.uz";

// Инициализируем один раз базовый запрос без headers
const rawBaseQuery = fetchBaseQuery({ baseUrl });

export const authBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Достаём токены при каждом запросе
  const userKey = Cookies.get(ENUM_COOKIES_TYPES.CERTIFICATE_USER_KEY);
  const partnerToken = "your-partner-key";

  // Преобразуем args, если это FetchArgs, и дописываем headers
  let modifiedArgs: FetchArgs;
  if (typeof args === "string") {
    modifiedArgs = { url: args };
  } else {
    modifiedArgs = { ...args };
  }

  modifiedArgs.headers = {
    ...(modifiedArgs.headers || {}),
    "user-key": userKey || "",
    "Partner-Authorization": partnerToken || "",
    "Content-Type": "application/json", // если нужно
  };

  const result = await rawBaseQuery(modifiedArgs, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // Вызов логаута
    api.dispatch(logoutEcp());
  }

  return result;
};
