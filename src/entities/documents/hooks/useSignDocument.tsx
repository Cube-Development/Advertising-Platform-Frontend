import {
  CreateMessageKeyId,
  CreateMessageSignature,
  useGetTimestampMutation,
} from "@entities/organization";
import { useCryptoCertificates, useCryptoMessage } from "@shared/api";
import { useToast } from "@shared/ui";
import { useTranslation } from "react-i18next";
import { useCreateSignEDOMutation, useGetSignInfoEDOMutation } from "../api";

export const useSignDocument = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const { sendMessage } = useCryptoMessage();
  const [getTimestamp, { isLoading: isLoadingLogin }] =
    useGetTimestampMutation();
  const [toSign, { isLoading: isLoadingToSign }] = useGetSignInfoEDOMutation();
  const [createSign, { isLoading: isLoadingCreateSign }] =
    useCreateSignEDOMutation();

  const { certificates, certificatesLoading, isSignatureLoading } =
    useCryptoCertificates();

  const sign = async (documentId: string, owner: 0 | 1 = 0) => {
    try {
      // Получаем JSON документа для подписи
      const response = await toSign({ documentId, owner }).unwrap();
      const documentJson = response?.data?.json || {};
      // Шаг 1: Загрузка ключа
      const keyResponse = await sendMessage(
        CreateMessageKeyId(certificates[0]),
      );
      const keyId = keyResponse.keyId;

      // Преобразуем в JSON-строку
      const jsonString = JSON.stringify(documentJson);
      // Кодируем в base64 (в браузере)
      const message = String.fromCharCode(
        ...new TextEncoder().encode(jsonString),
      );

      // Шаг 2: Создание подписи (используем JSON документа)
      const signResponse = await sendMessage(
        CreateMessageSignature(message, keyId),
      );

      // Шаг 3: Прикрепление TimeStamp
      const timestampResponse = await getTimestamp({
        pkcs7: signResponse.pkcs7_64,
        signatureHex: signResponse.signature_hex,
      }).unwrap();

      const signature = timestampResponse?.timeStampTokenB64 || "";

      // Шаг 4: Подпись документа
      const createSignResponse = await createSign({
        documentId,
        signature,
      }).unwrap();
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
    sign,
    isLoading:
      isLoadingLogin ||
      isLoadingToSign ||
      isLoadingCreateSign ||
      certificatesLoading ||
      isSignatureLoading,
  };
};
