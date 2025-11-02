import { ENUM_COOKIES_TYPES } from "@shared/config";
import Cookies from "js-cookie";

export const useClearCookiesOnPage = () => {
  Cookies.remove(ENUM_COOKIES_TYPES.PROJECT_ID);
  Cookies.remove(ENUM_COOKIES_TYPES.IS_CHANNEL_REPLACED);
};
