import { QueryParams } from "@features/queryParams";
// import { useAuth } from "@shared/hooks/useAuth";
import { useAppDispatch } from "@shared/store";
import { userSlice } from "@shared/store/reducers";
import { authAPI } from "@shared/store/services/authService";
import Cookies from "js-cookie";
import { useEffect } from "react";

export const HandleAuth = () => {
  const [getTokens] = authAPI.useGetTokensMutation();

  const dispatch = useAppDispatch();

  // const { toggleLogin } = useAuth();

  const handleAuthTokens = async (code: string) => {
    try {
      const genState = Cookies.get("genState");
      if (state === genState) {
        const result = await getTokens({ authorization_code: code });
        // maybe check role from token
        // navigate to /blogger if role === blogger + role context methods
        if ("data" in result) {
          const tokenData = result.data;
          dispatch(userSlice.actions.login(tokenData));
          Cookies.remove("genState");
          console.log("handleAuth");
        } else {
          console.error("Ошибка получения токена:", result.error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { code, state } = QueryParams();

  useEffect(() => {
    if (code && state) {
      handleAuthTokens(code);
    }
  }, []);

  return <></>;
};
