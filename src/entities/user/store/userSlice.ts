import { ENUM_ROLES, USER_ROLES } from "@entities/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import Cookies from "js-cookie";

interface UserState {
  isAuth: boolean;
  isAuthEcp?: boolean;
  isOfferSign?: boolean;
  isOfferOpen?: boolean;
  role: ENUM_ROLES;
  isPremiumUser?: boolean;
  premiumBalance?: number;
}

const roleFromCookies = Cookies.get(ENUM_COOKIES_TYPES.ROLE);
const getRole: ENUM_ROLES =
  roleFromCookies &&
  Object.values(ENUM_ROLES).includes(roleFromCookies as ENUM_ROLES)
    ? (roleFromCookies as ENUM_ROLES)
    : ENUM_ROLES.ADVERTISER;

const initialState: UserState = {
  isAuth: Cookies.get(ENUM_COOKIES_TYPES.IS_AUTH) === "true" ? true : false,
  isAuthEcp:
    Cookies.get(ENUM_COOKIES_TYPES.IS_AUTH_ECP) === "true" ? true : false,
  role: getRole,
  isOfferSign: false,
  isOfferOpen: false,
  isPremiumUser: false,
  premiumBalance: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      Cookies.set(ENUM_COOKIES_TYPES.IS_AUTH, "true");
      state.isAuth = true;
    },
    loginEcp: (state) => {
      Cookies.set(ENUM_COOKIES_TYPES.IS_AUTH_ECP, "true");
      state.isAuthEcp = true;
    },
    offerSign: (state) => {
      state.isOfferSign = true;
    },
    offerOpen: (state, action: PayloadAction<boolean>) => {
      state.isOfferOpen = action.payload;
    },
    logout: (state) => {
      Cookies.remove(ENUM_COOKIES_TYPES.PROJECT_ID);
      Cookies.remove(ENUM_COOKIES_TYPES.TOKEN);
      Cookies.remove(ENUM_COOKIES_TYPES.USER_ID);
      Cookies.set(ENUM_COOKIES_TYPES.IS_AUTH, "false");
      const logoutRole = USER_ROLES.includes(
        Cookies.get(ENUM_COOKIES_TYPES.ROLE) as ENUM_ROLES,
      )
        ? (Cookies.get(ENUM_COOKIES_TYPES.ROLE) as ENUM_ROLES)
        : ENUM_ROLES.ADVERTISER;
      Cookies.set(ENUM_COOKIES_TYPES.ROLE, logoutRole);
      state.isAuth = false;
      state.role = logoutRole;
      state.isPremiumUser = false;

      userSlice.caseReducers.logoutEcp(state);
    },
    logoutEcp: (state) => {
      Cookies.remove(ENUM_COOKIES_TYPES.CERTIFICATE_USER_KEY);
      Cookies.set(ENUM_COOKIES_TYPES.IS_AUTH_ECP, "false");
      state.isAuthEcp = false;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setPremiumUser: (state, action: PayloadAction<boolean>) => {
      state.isPremiumUser = action.payload;
    },
    setPremiumBalance: (state, action: PayloadAction<number>) => {
      state.premiumBalance = action.payload;
    },
    toggleRole: (state, action: PayloadAction<ENUM_ROLES>) => {
      state.role = action.payload;
      Cookies.set(ENUM_COOKIES_TYPES.ROLE, `${action.payload}`);
    },
  },
});

export default userSlice.reducer;
export const {
  login,
  logout,
  setAuth,
  toggleRole,
  loginEcp,
  logoutEcp,
  offerSign,
  offerOpen,
  setPremiumUser,
  setPremiumBalance,
} = userSlice.actions;
