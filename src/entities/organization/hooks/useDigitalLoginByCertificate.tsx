import { loginEcp, offerSign } from "@entities/user";
import { Certificate, useCryptoMessage } from "@shared/api";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { useAppDispatch } from "@shared/hooks";
import { useToast } from "@shared/ui";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import {
  useCheckOfferSignedMutation,
  useGetTimestampMutation,
  useGetTokenByCertificateMutation,
} from "../api";
import {
  CreateMessageKeyId,
  CreateMessageSignature,
  parseCertificateAlias,
} from "../helpers";
import { ENUM_ORGANIZATION_STATUS, IGetMyOrganizationResponse } from "../types";
import { useCreateOrganization } from "./useCreateOrganization";

export const useDigitalLoginByCertificate = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const { sendMessage } = useCryptoMessage();
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
      const keyResponse = await sendMessage(CreateMessageKeyId(certificate));
      const keyId = keyResponse.keyId;

      // Шаг 2: Создание подписи (используем ПИНФЛ из сертификата)
      const signResponse = await sendMessage(
        CreateMessageSignature(pnflFromCert, keyId),
      );

      // Шаг 3: Прикрепление TimeStamp
      const timestampResponse = await getTimestamp({
        pkcs7: signResponse.pkcs7_64,
        signatureHex: signResponse.signature_hex,
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
      if (organization?.status !== ENUM_ORGANIZATION_STATUS.ACTIVE) {
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
        err instanceof Error ? err.message : "Ошибка входа по ЭЦП";

      toast({
        variant: "error",
        title: errorMessage,
      });
    }
  };

  return {
    loginCertificate,
    isLoading:
      isLoadingLogin || isLoadingGetToken || isLoadingSign || isLoading,
  };
};
