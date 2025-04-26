import { ENUM_ROLES, USER_ROLES } from "@entities/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cookiesTypes } from "@shared/config";
import Cookies from "js-cookie";

interface UserState {
  isAuth: boolean;
  role: ENUM_ROLES;
}

const roleFromCookies = Cookies.get(cookiesTypes.role);
const getRole: ENUM_ROLES =
  roleFromCookies &&
  Object.values(ENUM_ROLES).includes(roleFromCookies as ENUM_ROLES)
    ? (roleFromCookies as ENUM_ROLES)
    : ENUM_ROLES.ADVERTISER;

const initialState: UserState = {
  isAuth: Cookies.get(cookiesTypes.isAuth) === "true" ? true : false,
  role: getRole,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      Cookies.set(cookiesTypes.isAuth, "true");
      state.isAuth = true;
    },
    logout: (state) => {
      Cookies.remove(cookiesTypes.projectId);
      Cookies.remove(cookiesTypes.token);
      Cookies.remove(cookiesTypes.userId);
      Cookies.set(cookiesTypes.isAuth, "false");
      const logoutRole = USER_ROLES.includes(
        Cookies.get(cookiesTypes.role) as ENUM_ROLES,
      )
        ? (Cookies.get(cookiesTypes.role) as ENUM_ROLES)
        : ENUM_ROLES.ADVERTISER;
      Cookies.set(cookiesTypes.role, logoutRole);
      state.isAuth = false;
      state.role = logoutRole;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    toggleRole: (state, action: PayloadAction<ENUM_ROLES>) => {
      state.role = action.payload;
      Cookies.set(cookiesTypes.role, `${action.payload}`);
    },
  },
});

export default userSlice.reducer;
export const { login, logout, setAuth, toggleRole } = userSlice.actions;
