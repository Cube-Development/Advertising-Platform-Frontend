import { QueryParams } from "@features/queryParams";
import { useAppDispatch } from "@shared/store";
import { userSlice } from "@shared/store/reducers";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { roles } from "@shared/config/roles";
import { useNavigate } from "react-router-dom";
import { paths } from "@shared/routing";
import { useGetTokensMutation } from "@shared/store/services/authService";

type DecodedToken = {
  role: roles;
};

export const HandleAuth = () => {
  const [getTokens] = useGetTokensMutation();
  const dispatch = useAppDispatch();
  const { code, state } = QueryParams();
  const navigate = useNavigate();

  const handleAuthTokens = async (code: string) => {
    const genState = Cookies.get("genState");
    if (state === genState) {
      getTokens({ authorization_code: code })
        .unwrap()
        .then((data) => {
          dispatch(userSlice.actions.login(data));
          const decoded: DecodedToken = jwtDecode(data.access_token);
          dispatch(userSlice.actions.login(data));
          navigate(
            decoded.role === roles.advertiser ? paths.main : paths.mainBlogger,
          );
          dispatch(userSlice.actions.toggleRole(decoded?.role));
          Cookies.remove("genState");
        })
        .catch((error) => {
          console.error("Ошибка получения токена:", error);
        });
    }
  };

  useEffect(() => {
    if (code && state) {
      handleAuthTokens(code);
    }
  }, [code, state]);

  return <></>;
};
