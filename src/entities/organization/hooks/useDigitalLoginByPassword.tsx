import { loginEcp } from "@entities/user";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { useAppDispatch } from "@shared/hooks";
import { useToast } from "@shared/ui";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { useGetTokenByPasswordMutation } from "../api";
import { ILegalData } from "../types";

export const useDigitalLoginByPassword = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [getToken, { isLoading }] = useGetTokenByPasswordMutation();

  const loginPassword = async (
    userData: Pick<ILegalData, "PNFL" | "password">,
  ) => {
    try {
      // Шаг 4: Логин по Паролю
      const tokenResponse = await getToken({
        PNFL: userData?.PNFL || "",
        password: userData?.password,
        lang: "ru",
      }).unwrap();

      Cookies.set(
        ENUM_COOKIES_TYPES.CERTIFICATE_USER_KEY,
        tokenResponse?.token,
      );
      // Шаг 5: Получение логин по токену
      dispatch(loginEcp());
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Ошибка регистрации";

      toast({
        variant: "error",
        title: errorMessage,
      });
    }
  };

  return {
    loginPassword,
    isLoading,
  };
};
