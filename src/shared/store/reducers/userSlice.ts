import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { roles } from "@shared/config/roles";
import { paths } from "@shared/routing";
import { IToken } from "@shared/types/tokens";
import Cookies from "js-cookie";

interface UserState {
  isAuth: boolean;
  role: roles;
}

const roleFromCookies = Cookies.get("role");
const getRole: roles =
  roleFromCookies && Object.values(roles).includes(roleFromCookies as roles)
    ? (roleFromCookies as roles)
    : roles.advertiser;

const initialState: UserState = {
  isAuth: Cookies.get("isAuth") === "true" ? true : false,
  role: getRole,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IToken>) => {
      Cookies.set("isAuth", "true");
      state.isAuth = true;
      Cookies.set("accessToken", action.payload.access_token, {
        secure: true,
        httpOnly: false,
        sameSite: "None",
        // expires: 7,
      });
      Cookies.set("refreshToken", action.payload.refresh_token, {
        secure: true,
        httpOnly: false,
        sameSite: "None",
        // expires: 7,
      });
    },
    logout: (state) => {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.set("isAuth", "false");
      state.isAuth = false;
      if (state.role === roles.advertiser) {
        window.location.href = paths.main;
      } else if (state.role === roles.blogger) {
        window.location.href = paths.mainBlogger;
      }
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    toggleRole: (state, action: PayloadAction<roles>) => {
      state.role = action.payload;
      Cookies.set("role", `${action.payload}`);
    },
  },
});
