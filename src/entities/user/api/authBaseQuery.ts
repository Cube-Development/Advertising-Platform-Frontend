// import {
//   BaseQueryFn,
//   FetchArgs,
//   fetchBaseQuery,
//   FetchBaseQueryError,
// } from "@reduxjs/toolkit/query/react";
// import { Mutex } from "async-mutex";
// import Cookies from "js-cookie";
// import { IToken, logout } from "@entities/user";

// interface ITokenResponse {
//   data?: IToken;
// }

// const baseUrl = `${import.meta.env.VITE_BASE_URL}`;

// const mutex = new Mutex();

// export const authBaseQuery: BaseQueryFn<
//   string | FetchArgs,
//   unknown,
//   FetchBaseQueryError
// > = async (args, api, extraOptions) => {
//   const accessToken = Cookies.get("accessToken");
//   const baseQuery = fetchBaseQuery({
//     baseUrl,
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
//   await mutex.waitForUnlock();
//   let result = await baseQuery(args, api, extraOptions);
//   if (result.error && result.error.status === 401) {
//     if (!mutex.isLocked()) {
//       const release = await mutex.acquire();
//       try {
//         const refreshToken = Cookies.get("refreshToken");
//         const refreshResult = (await baseQuery(
//           {
//             method: "POST",
//             credentials: "include",
//             url: "/auth/refresh_token",
//             body: { refresh_token: refreshToken },
//           },
//           api,
//           extraOptions,
//         )) as ITokenResponse;

//         if (refreshResult.data) {
//           const newAccessToken = refreshResult.data.access_token;
//           Cookies.set("accessToken", newAccessToken);
//           const newRefreshToken = refreshResult.data.refresh_token;
//           Cookies.set("refreshToken", newRefreshToken);
//           const newBaseQuery = fetchBaseQuery({
//             baseUrl,
//             headers: {
//               Authorization: `Bearer ${newAccessToken}`,
//             },
//           });
//           result = await newBaseQuery(args, api, extraOptions);
//         } else {
//           api.dispatch(logout());
//         }
//       } finally {
//         release();
//       }
//     } else {
//       await mutex.waitForUnlock();
//       result = await baseQuery(args, api, extraOptions);
//     }
//   }

//   return result;
// };

import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import Cookies from "js-cookie";
import { logout } from "@entities/user";

interface ILoginRequest {
  username: string;
  password: string;
}

const baseUrl = `${import.meta.env.VITE_BASE_URL}`;

const mutex = new Mutex();

export const authBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const advBlogCookie = Cookies.get("adv-blog");
  const baseQuery = fetchBaseQuery({
    baseUrl,
    headers: {
      accept: "application/json",
      Cookie: `adv-blog=${advBlogCookie}`,
    },
    credentials: "include",
  });

  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  // if (result.error && result.error.status === 401) {
  //   if (!mutex.isLocked()) {
  //     const release = await mutex.acquire();
  //     try {
  //       const username = Cookies.get("username");  // Получаем сохранённое имя пользователя
  //       const password = Cookies.get("password");  // Получаем сохранённый пароль

  //       if (username && password) {
  //         const loginResult = await baseQuery(
  //           {
  //             method: "POST",
  //             credentials: "include",
  //             url: "/auth/jwt/login",
  //             body: {
  //               username,
  //               password,
  //             } as ILoginRequest,
  //           },
  //           api,
  //           extraOptions,
  //         );

  //         if (loginResult.error) {
  //           api.dispatch(logout());
  //         } else {
  //           const newAdvBlogCookie = Cookies.get("adv-blog");
  //           if (newAdvBlogCookie) {
  //             Cookies.set("adv-blog", newAdvBlogCookie);
  //           }

  //           const newBaseQuery = fetchBaseQuery({
  //             baseUrl,
  //             headers: {
  //               Authorization: `Bearer ${newAdvBlogCookie}`,
  //             },
  //           });
  //           result = await newBaseQuery(args, api, extraOptions);
  //         }
  //       } else {
  //         api.dispatch(logout());
  //       }
  //     } finally {
  //       release();
  //     }
  //   } else {
  //     await mutex.waitForUnlock();
  //     result = await baseQuery(args, api, extraOptions);
  //   }
  // }

  return result;
};
