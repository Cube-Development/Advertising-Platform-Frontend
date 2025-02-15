import { cookiesTypes } from "@shared/config";
import Cookies from "js-cookie";

export const useClearCookiesOnPage = () => {
  Cookies.remove(cookiesTypes.projectId);
  Cookies.remove(cookiesTypes.isChannelReplaced);
  Cookies.remove(cookiesTypes.isReview);
};
