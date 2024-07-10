import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  sub: string;
};

export const GetUserId = () => {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    const userId: DecodedToken = jwtDecode(accessToken);
    return userId.sub;
  } else {
    return undefined;
  }
};
