import { roles, userRoles } from "@entities/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cookiesTypes } from "@shared/config";
import Cookies from "js-cookie";

interface UserState {
  isAuth: boolean;
  role: roles;
}

const roleFromCookies = Cookies.get(cookiesTypes.role);
const getRole: roles =
  roleFromCookies && Object.values(roles).includes(roleFromCookies as roles)
    ? (roleFromCookies as roles)
    : roles.advertiser;

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
      const logoutRole = userRoles.includes(
        Cookies.get(cookiesTypes.role) as roles,
      )
        ? (Cookies.get(cookiesTypes.role) as roles)
        : roles.advertiser;
      Cookies.set(cookiesTypes.role, logoutRole);
      state.isAuth = false;
      state.role = logoutRole;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    toggleRole: (state, action: PayloadAction<roles>) => {
      state.role = action.payload;
      Cookies.set(cookiesTypes.role, `${action.payload}`);
    },
  },
});

export default userSlice.reducer;
export const { login, logout, setAuth, toggleRole } = userSlice.actions;
