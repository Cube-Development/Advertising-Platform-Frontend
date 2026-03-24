import { ENUM_ROLES, loginEcp, offerSign } from "@entities/user";
import { Certificate, useCryptoCertificates } from "@shared/api";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { useToast } from "@shared/ui";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import {
  useCheckOfferSignedMutation,
  useGetTimestampMutation,
  useGetTokenByCertificateMutation,
} from "../api";
import { parseCertificateAlias } from "../helpers";
import { ENUM_ORGANIZATION_STATUS, IGetMyOrganizationResponse } from "../types";
import { useCreateOrganization } from "./useCreateOrganization";

export const useDigitalLoginByCertificate = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.user);

  const { loadKey, createSignature } = useCryptoCertificates();
  const [getTimestamp, { isLoading: isLoadingLogin }] =
    useGetTimestampMutation();
  const [getToken, { isLoading: isLoadingGetToken }] =
    useGetTokenByCertificateMutation();

  const [checkSign, { isLoading: isLoadingSign }] =
    useCheckOfferSignedMutation();

  const { create, isLoading } = useCreateOrganization();

  const loginCertificate = async (
    certificate: Certificate,
    organization: IGetMyOrganizationResponse,
  ) => {
    try {
      // Получаем ПИНФЛ из выбранного сертификата
      const certInfo = parseCertificateAlias(certificate!.alias);
      const pnflFromCert = certInfo?.uid || certInfo.pnfl;

      // Шаг 1: Загрузка ключа
      const keyId = await loadKey(certificate);

      // Шаг 2: Создание подписи (используем ПИНФЛ из сертификата)
      const signResponse = await createSignature(keyId, pnflFromCert);

      // Шаг 3: Прикрепление TimeStamp
      const timestampResponse = await getTimestamp({
        pkcs7: signResponse.pkcs7,
        signatureHex: signResponse.signatureHex,
      }).unwrap();

      const signature = timestampResponse?.timeStampTokenB64 || "";

      // Шаг 4: Получение токена
      const tokenResponse = await getToken({
        PNFL: pnflFromCert,
        signature,
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
        role !== ENUM_ROLES.MODERATOR
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
    } catch (err: any) {
      const errorMessage =
        err?.data?.error?.message === "Unique violation error"
          ? "toasts.organization.create.unique"
          : "toasts.organization.login.error";

      toast({
        variant: "error",
        title: t(errorMessage),
      });
    }
  };

  return {
    loginCertificate,
    isLoading:
      isLoadingLogin || isLoadingGetToken || isLoadingSign || isLoading,
  };
};
