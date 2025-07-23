import { loginEcp } from "@entities/user";
import { Certificate, useCryptoMessage } from "@shared/api";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { useAppDispatch } from "@shared/hooks";
import { useToast } from "@shared/ui";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import {
  useGetTimestampMutation,
  useGetTokenByCertificateMutation,
} from "../api";
import {
  CreateMessageKeyId,
  CreateMessageSignature,
  parseCertificateAlias,
} from "../helpers";

export const useDigitalLoginByCertificate = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { sendMessage } = useCryptoMessage();
  const [getTimestamp, { isLoading: isLoadingLogin }] =
    useGetTimestampMutation();
  const [getToken, { isLoading: isLoadingGetToken }] =
    useGetTokenByCertificateMutation();

  const loginCertificate = async (certificate: Certificate) => {
    try {
      // Получаем ПИНФЛ из выбранного сертификата
      const certInfo = parseCertificateAlias(certificate!.alias);
      const pnflFromCert = certInfo.pnfl;

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
      // Шаг 5: Получение логин по токену
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
    isLoading: isLoadingLogin || isLoadingGetToken,
  };
};
