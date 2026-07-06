import {
  useGetUserMutation,
  useLazyGoogleCallbackQuery,
} from "@entities/user";
import { useHandleAuth } from "@features/useHandleAuth";
import { getGoogleAuthErrorKey } from "@features/google-auth/getGoogleAuthErrorKey";
import { useAppSelector } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import { queryParamKeys } from "@shared/utils";
import { useToast } from "@shared/ui";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export const useGoogleAuthCallback = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { handleAuth } = useHandleAuth();
  const { isAuth } = useAppSelector((state) => state.user);

  const [getUser] = useGetUserMutation();
  const [googleCallback] = useLazyGoogleCallbackQuery();

  const startedForSearch = useRef<string | null>(null);

  useEffect(() => {
    if (isAuth) return;

    // Один запуск на один callback URL
    if (startedForSearch.current === location.search) {
      return;
    }

    startedForSearch.current = location.search;

    const params = new URLSearchParams(location.search);

    const error = params.get("error");
    const code = params.get(queryParamKeys.code);
    const state = params.get(queryParamKeys.state);
    const googleAuth = params.get(queryParamKeys.googleAuth);

    const hasOAuthParams =
      !!error || (!!code && !!state) || googleAuth === "1";

    if (!hasOAuthParams) {
      navigate(ENUM_PATHS.LOGIN, { replace: true });
      return;
    }

    const handleError = (err?: unknown) => {
      const errorKey =
        error === "OAUTH_USER_ALREADY_EXISTS"
          ? "toasts.authorization.oauth_user_already_exists"
          : getGoogleAuthErrorKey(err);

      toast({
        variant: "error",
        title: t(errorKey),
      });

      navigate(ENUM_PATHS.LOGIN, { replace: true });
    };

    const completeAuth = async () => {
      try {
        const data = await getUser().unwrap();
        await handleAuth(data.role, data.id);
      } catch (err) {
        handleError(err);
      }
    };

    if (error) {
      handleError();
      return;
    }

    if (code && state) {
      void googleCallback({ code, state })
        .unwrap()
        .then(completeAuth)
        .catch(handleError);

      return;
    }

    if (googleAuth === "1") {
      void completeAuth();
    }
  }, [location.search]);
};