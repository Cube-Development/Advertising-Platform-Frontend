import { roles, userRoles } from "@entities/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    login: (state) => {
      Cookies.set("isAuth", "true");
      state.isAuth = true;
    },
    logout: (state) => {
      Cookies.remove("project_id");
      Cookies.remove("adv-blog");
      Cookies.remove("user_id");
      Cookies.set("isAuth", "false");
      const logoutRole = userRoles.includes(Cookies.get("role") as roles)
        ? (Cookies.get("role") as roles)
        : roles.advertiser;
      Cookies.set("role", logoutRole);
      state.isAuth = false;
      state.role = logoutRole;
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
export const { login, logout, setAuth, toggleRole } = userSlice.actions;
