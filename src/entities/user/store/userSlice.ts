import { roles } from "@entities/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface UserState {
  isAuth: boolean;
  role: roles;
  user_id?: string;
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
      Cookies.set("isAuth", "false");
      Cookies.remove("adv-blog");
      state.isAuth = false;
    },
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    toggleRole: (state, action: PayloadAction<roles>) => {
      state.role = action.payload;
      Cookies.set("role", `${action.payload}`);
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.user_id = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { login, logout, setAuth, toggleRole, setUserId } =
  userSlice.actions;
