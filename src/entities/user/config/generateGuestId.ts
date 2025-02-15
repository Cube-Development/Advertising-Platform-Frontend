import { cookiesTypes } from "@shared/config";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

export const GenerateGuestId = () => {
  const guestId = uuidv4();
  Cookies.set(cookiesTypes.guestId, guestId);
  return guestId;
};
