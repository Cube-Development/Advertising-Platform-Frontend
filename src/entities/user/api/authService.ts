import {
  IEmailData,
  IEventsData,
  IPasswordData,
  IProfileData,
  IUser,
  IUserData,
  ENUM_ROLES,
} from "@entities/user";
import { authApi, baseApi, USER_DATA } from "@shared/api";
import { languagesNum } from "@shared/config";

type RegisterReq = {
  email: string;
  password: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  role: ENUM_ROLES;
  language: languagesNum;
  code: number;
};
type GetUserRes = IUser;

type RegisterRes = IUser;

type LoginReq = {
  username: string;
  password: string;
};

export const authorizationAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<string, LoginReq>({
      query: (BodyParams) => {
        const urlEncodedBody = new URLSearchParams({
          username: BodyParams.username,
          password: BodyParams.password,
        });
        return {
          url: `/auth/jwt/login`,
          method: `POST`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: urlEncodedBody.toString(),
          credentials: "include",
        };
      },
    }),
    getCodeForRegistration: build.mutation<void, { email: string }>({
      query: (params) => ({
        url: `/auth/send-registration-code`,
        method: `POST`,
        params,
      }),
    }),
    // verifyEmail: build.mutation<void, { email: string; code: number }>({
    //   query: (body) => ({
    //     url: `/auth/verify`,
    //     method: `POST`,
    //     body,
    //   }),
    // }),
    register: build.mutation<RegisterRes, RegisterReq>({
      query: (BodyParams) => ({
        url: `/auth/register`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
    getCodeForForgotPassword: build.mutation<void, { email: string }>({
      query: (body) => ({
        url: `/auth/forgot-password`,
        method: `POST`,
        body,
      }),
    }),
    resetPassword: build.mutation<
      void,
      {
        email: string;
        code: number;
        password: string;
      }
    >({
      query: (body) => ({
        url: `/auth/reset-password`,
        method: `POST`,
        body,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useGetCodeForRegistrationMutation,
  // useVerifyEmailMutation,
  useRegisterMutation,
  useGetCodeForForgotPasswordMutation,
  useResetPasswordMutation,
} = authorizationAPI;

export const userAPI = authApi.injectEndpoints({
  endpoints: (build) => ({
    logout: build.mutation<void, void>({
      query: (BodyParams) => ({
        url: `/auth/jwt/logout`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
    getUser: build.mutation<GetUserRes, void>({
      query: () => ({
        url: `/users/me`,
        method: `GET`,
      }),
    }),
    getUserQuery: build.query<GetUserRes, void>({
      query: () => ({
        url: `/users/me`,
        method: `GET`,
      }),
    }),

    getProfile: build.query<IProfileData, void>({
      query: () => ({
        url: `/auth/user`,
        method: `GET`,
      }),
      providesTags: [USER_DATA],
    }),
    editProfile: build.mutation<{ success: boolean }, IUserData | IEventsData>({
      query: (BodyParams) => ({
        url: `/auth/user/additional`,
        method: `PUT`,
        body: BodyParams,
      }),
    }),
    editPassword: build.mutation<{ success: boolean }, IPasswordData>({
      query: (BodyParams) => ({
        url: `/auth/replace-password`,
        method: `PUT`,
        body: BodyParams,
      }),
    }),
    editEmailRequest: build.mutation<{ success: boolean }, IEmailData>({
      query: (BodyParams) => ({
        url: `/auth/change/email/request`,
        method: `POST`,
        body: BodyParams,
      }),
    }),
    editEmailAccept: build.mutation<{ success: boolean }, { code: number }>({
      query: (BodyParams) => ({
        url: `/auth/change/email/accept`,
        method: `POST`,
        body: BodyParams,
      }),
      invalidatesTags: [USER_DATA],
    }),
    updateRole: build.mutation<void, { role: ENUM_ROLES }>({
      query: (params) => ({
        url: `/users/role`,
        method: `PATCH`,
        params,
      }),
    }),
    changeLanguage: build.mutation<void, { language: languagesNum }>({
      query: (params) => ({
        url: `/auth/language`,
        method: `POST`,
        params,
      }),
    }),
  }),
});

export const {
  useLogoutMutation,
  useGetUserMutation,
  useGetUserQueryQuery,
  useUpdateRoleMutation,
  useChangeLanguageMutation,
  useGetProfileQuery,
  useEditProfileMutation,
  useEditPasswordMutation,
  useEditEmailRequestMutation,
  useEditEmailAcceptMutation,
} = userAPI;
