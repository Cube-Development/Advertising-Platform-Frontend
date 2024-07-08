import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

export const GenerateGuestId = () => {
  Cookies.set("guest_id", uuidv4());
};
