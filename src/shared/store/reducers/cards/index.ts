import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { IPost , IComment} from './types';
import Cookies from 'js-cookie';

const getAccessToken = () => {
    const accessToken = Cookies.get('token');
    console.log('accessToken', accessToken)
    return accessToken || null;
  };
  
const baseQuery = fetchBaseQuery({
baseUrl: 'https://jsonplaceholder.typicode.com',
credentials: 'include', // Позволяет отправлять куки при запросах (если ваши куки с SameSite=None, Secure)
mode: 'cors',
headers: {
    Authorization: `Bearer ${getAccessToken()}`, // Вставляем access token в заголовок запроса
},
});


export const cardsApi = createApi({
  reducerPath: 'postsAPI',
  baseQuery: baseQuery,
  refetchOnFocus: true,
  endpoints: build => ({
        getPosts: build.query<IPost[], void>({
        query: () => ({url: `/posts`}),

      }),
        getPostById: build.query<IPost, number>({
          query: (id: number) => ({url: `posts/${id}`}),
          transformResponse: (response: IPost) => response,
    
          }),
        getCommentsById: build.query<IComment[], number>({
          query: (id: number) => ({url: `posts/${id}/comments`}),
          transformResponse: (response: IComment[]) => response,
          })
    })
})

export const {useGetPostsQuery} = cardsApi;


