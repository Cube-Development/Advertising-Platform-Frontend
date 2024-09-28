import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

export const GenerateGuestId = () => {
  const guest_id = uuidv4();
  Cookies.set("guest_id", guest_id);
  return guest_id;
};
