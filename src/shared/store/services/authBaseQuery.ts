import {
    BaseQueryFn,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
  } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { authAPI } from './authService';
import Cookies from 'js-cookie';
import { userSlice } from '../reducers';
  
  const baseUrl = `${import.meta.env.VITE_BASE_URL}`;

  const mutex = new Mutex();
  
  const authBaseQuery: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    const accessToken = Cookies.get('accessToken');
    const baseQuery = fetchBaseQuery({
      baseUrl,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        console.log("accessError")
        try {
          const refreshToken = Cookies.get("refreshToken")
          const refreshResult = await baseQuery(
            {
              method: 'POST',
              credentials: 'include',
              url: '/auth/refresh_token',
              body: { refresh_token: refreshToken },
            },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            result = await baseQuery(args, api, extraOptions);
          } else {
            console.log("refreshError")
            api.dispatch(userSlice.actions.logout());
            // const [logout] = authAPI.useLogoutMutation();
            // refreshToken && logout(refreshToken);
            // window.location.href = '/';
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }
  
    return result;
  };
  
  export default authBaseQuery;
  