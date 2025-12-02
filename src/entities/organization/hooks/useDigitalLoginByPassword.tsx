import { loginEcp, offerSign, USER_ROLES } from "@entities/user";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { useToast } from "@shared/ui";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import {
  useCheckOfferSignedMutation,
  useGetTokenByPasswordMutation,
} from "../api";
import {
  ENUM_ORGANIZATION_STATUS,
  IGetMyOrganizationResponse,
  ILegalData,
} from "../types";
import { useCreateOrganization } from "./useCreateOrganization";

export const useDigitalLoginByPassword = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.user);
  const [getToken, { isLoading: isLoadingGetToken }] =
    useGetTokenByPasswordMutation();
  const [checkSign, { isLoading: isLoadingSign }] =
    useCheckOfferSignedMutation();

  const { create, isLoading } = useCreateOrganization();

  const loginPassword = async (
    userData: Pick<ILegalData, "PNFL" | "password">,
    organization: IGetMyOrganizationResponse,
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
      // Шаг 5: Создание организации
      await create(organization);

      // Шаг 6: Проверка подписи
      if (
        organization?.status !== ENUM_ORGANIZATION_STATUS.ACTIVE &&
        USER_ROLES.includes(role)
      ) {
        await checkSign()
          .unwrap()
          .then(() => {
            // Шаг 6.1: Указываем что оферта подписана
            dispatch(offerSign());
          })
          .catch(() => {
            toast({
              variant: "warning",
              title: t("toasts.organization.offer_sign.need"),
            });
          });
      } else {
        // Шаг 6.2: Указываем что оферта подписана
        dispatch(offerSign());
      }
      // Шаг 7: Осуществляем логин
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
    isLoading: isLoadingGetToken || isLoadingSign || isLoading,
  };
};
