import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { roles } from "@shared/config/roles";
import { IToken } from "@shared/types/tokens";
import Cookies from "js-cookie";

interface UserState {
  isAuth: boolean;
  role: roles;
}

const initialState: UserState = {
  isAuth: Cookies.get("isAuth") === "true" ? true : false,
  role:
    Cookies.get("role") === `${roles.blogger}`
      ? roles.blogger
      : roles.advertiser,
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
      state.role = roles.advertiser;
      window.location.href = "/";
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

export default userSlice.reducer;
