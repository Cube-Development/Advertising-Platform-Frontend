import {
  useGetUserMutation,
  useLazyGoogleCallbackQuery,
} from "@entities/user";
import { useHandleAuth } from "@features/useHandleAuth";
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
  const isProcessing = useRef(false);

  useEffect(() => {
    if (isAuth || isProcessing.current) return;

    const params = new URLSearchParams(location.search);
    const error = params.get("error");
    const code = params.get(queryParamKeys.code);
    const state = params.get(queryParamKeys.state);
    const googleAuth = params.get(queryParamKeys.googleAuth);

    const hasOAuthParams =
      error || (code && state) || googleAuth === "1";

    if (!hasOAuthParams) {
      navigate(ENUM_PATHS.LOGIN, { replace: true });
      return;
    }

    isProcessing.current = true;

    const handleError = () => {
      toast({
        variant: "error",
        title: t("toasts.authorization.google_error"),
      });
      navigate(ENUM_PATHS.LOGIN, { replace: true });
      isProcessing.current = false;
    };

    const completeAuth = async () => {
      try {
        const data = await getUser().unwrap();
        await handleAuth(data.role, data.id);
      } catch {
        handleError();
      } finally {
        isProcessing.current = false;
      }
    };

    if (error) {
      handleError();
      return;
    }

    if (code && state) {
      googleCallback({ code, state })
        .unwrap()
        .then(() => completeAuth())
        .catch(handleError);
      return;
    }

    if (googleAuth === "1") {
      completeAuth();
    }
  }, [
    location.search,
    isAuth,
    getUser,
    googleCallback,
    handleAuth,
    navigate,
    toast,
    t,
  ]);
};
