import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

const baseUrl = import.meta.env.VITE_BASE_URL;

const getAccessToken = () => {
    const accessToken = Cookies.get('token');
    return accessToken || null;
  };
  
export const customBaseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: 'include', // Позволяет отправлять куки при запросах (если ваши куки с SameSite=None, Secure)
  mode: 'cors',
  headers: {
      Authorization: `Bearer ${getAccessToken()}`, // Вставляем access token в заголовок запроса
},
});
