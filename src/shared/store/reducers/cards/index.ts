import { createApi } from '@reduxjs/toolkit/query/react'
import { IPost , IComment} from './types';
import { customBaseQuery } from '../customBase';


export const cardsApi = createApi({
  reducerPath: 'postsAPI',
  baseQuery: customBaseQuery,
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


