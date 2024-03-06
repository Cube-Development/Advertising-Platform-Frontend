import { QueryParams } from "@features/queryParams";
import { useAppDispatch } from "@shared/store";
import { userSlice } from "@shared/store/reducers";
import { authAPI } from "@shared/store/services/authService";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { roles } from "@shared/config/roles";
import { useNavigate } from "react-router-dom";
import { paths } from "@shared/routing";

type DecodedToken = {
  role: roles;
};

export const HandleAuth = () => {
  const [getTokens] = authAPI.useGetTokensMutation();
  const dispatch = useAppDispatch();
  const { code, state } = QueryParams();
  const navigate = useNavigate();

  const handleAuthTokens = async (code: string) => {
    try {
      const genState = Cookies.get("genState");
      if (state === genState) {
        const result = await getTokens({ authorization_code: code });
        if ("data" in result) {
          const tokenData = result.data;
          dispatch(userSlice.actions.login(tokenData));
          const decoded: DecodedToken = jwtDecode(tokenData.access_token);
          navigate(
            decoded.role === roles.advertiser ? paths.main : paths.mainBlogger,
          );
          dispatch(userSlice.actions.toggleRole(decoded?.role));
          Cookies.remove("genState");
        } else {
          console.error("Ошибка получения токена:", result.error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code && state) {
      handleAuthTokens(code);
    }
  }, []);

  return <></>;
};
