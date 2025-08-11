import { Certificate } from "@shared/api";
import { useCryptoMessage } from "@shared/api";
import { useToast } from "@shared/ui";
import { useTranslation } from "react-i18next";
import { CreateMessageKeyId, CreateMessageSignature } from "../helpers";
import { useGetTimestampMutation, useSignUpMutation } from "../api";
import Cookies from "js-cookie";
import { ENUM_COOKIES_TYPES } from "@shared/config";
import { useAppDispatch } from "@shared/hooks";
import { loginEcp } from "@entities/user";

export const useDigitalRegister = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const { sendMessage } = useCryptoMessage();
  const [getTimestamp, { isLoading: isLoadingLogin }] =
    useGetTimestampMutation();

  const [signUp, { isLoading: isLoadingSignUp }] = useSignUpMutation();

  const registration = async (
    certificate: Certificate,
    userData: any,
    taxId: string | number,
  ) => {
    try {
      // Шаг 1: Загрузка ключа

      const keyResponse = await sendMessage(CreateMessageKeyId(certificate));
      const keyId = keyResponse.keyId;

      // Шаг 2: Создание подписи
      const signResponse = await sendMessage(
        CreateMessageSignature(taxId, keyId),
      );

      // Шаг 3: Прикрепление TimeStamp
      const timestampResponse = await getTimestamp({
        pkcs7: signResponse.pkcs7_64,
        signatureHex: signResponse.signature_hex,
      })
        .unwrap()
        .catch(() => {
          throw new Error("Ошибка timestampResponse");
        });

      const signature = timestampResponse?.timeStampTokenB64 || "";

      // Шаг 4: Финальная регистрация
      const registrationResponse = await signUp({
        email: userData?.email,
        mobile: userData?.phone,
        password: userData.password,
        accept: true,
        signature,
      })
        .unwrap()
        .catch((error) => {
          if (error?.data?.message) {
            throw new Error(error?.data?.message);
          } else if (
            error?.data?.taxId &&
            error?.data?.taxId?.includes("validation.unique")
          ) {
            throw new Error(
              "Ошибка: Пользователь с таким ИНН/ПИНФЛ уже существует",
            );
          } else {
            throw new Error("Ошибка registrationResponse");
          }
        });

      Cookies.set(
        ENUM_COOKIES_TYPES.CERTIFICATE_USER_KEY,
        registrationResponse?.token,
      );
      // Шаг 5: Получение логин по токену
      dispatch(loginEcp());

      toast({
        variant: "success",
        title: `Успешно прошли регистрацию`,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Ошибка регистрации";

      toast({
        variant: "error",
        title: errorMessage,
      });
    } finally {
    }
  };
  return {
    registration,
    isLoading: isLoadingLogin || isLoadingSignUp,
  };
};
