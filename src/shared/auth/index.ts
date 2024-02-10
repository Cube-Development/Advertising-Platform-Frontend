import axios, { AxiosResponse } from "axios";


interface ApiResponse {
  data: any;
}

const baseUrl: string = import.meta.env.VITE_BASE_URL;

interface Tokens {
    accessToken: string;
    refreshToken: string;
    status?: string;
  }

function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

export async function getAuthTokens(): Promise<Tokens | null> {
  try {
    // перделать заменить на пост запрос к беку и accessToken / refreshToken брать из response
    const response: AxiosResponse<ApiResponse> = await axios.get(baseUrl + '/posts');

    if (response.status === 200) {
      // Генерация случайных строк фиксированной длины
      const accessToken = generateRandomString(50);
      const refreshToken = generateRandomString(50);

      return { accessToken, refreshToken };

    } else {
      // В случае непредвиденного статуса, возвращаем null
      return null;
    }
  } catch (error: any) {
    console.log(error)
    return null;
  }
}


export async function postCode({ code }: { code: number }): Promise<Tokens | null> {
  try {
    // Заменить на POST запрос к бекенду
    const response: AxiosResponse<ApiResponse> = await axios.get(baseUrl + '/posts');
    console.log(response)
    if (response.status === 200) {
      // Если код совпадает с 11111, то генерируем токены
      if (code === 11111) {
        const accessToken = generateRandomString(50);
        const refreshToken = generateRandomString(50);
        const status = 'Success';

        return { accessToken, refreshToken, status };
      } else {
        const status = 'Invalid Code';
        return { accessToken: '', refreshToken: '', status };
      }
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}


// export const cardsApi = createApi({
//   reducerPath: 'postsAPI',
//   baseQuery: customBaseQuery,
//   refetchOnFocus: true,
//   endpoints: build => ({
//         getPosts: build.query<IPost[], void>({
//         query: () => ({url: `/posts`}),
//       }),
//         getPostById: build.query<IPost, number>({
//           query: (id: number) => ({url: `posts/${id}`}),
//           transformResponse: (response: IPost) => response,
    
//           }),
//         getCommentsById: build.query<IComment[], number>({
//           query: (id: number) => ({url: `posts/${id}/comments`}),
//           transformResponse: (response: IComment[]) => response,
//           }),
//     })
// })