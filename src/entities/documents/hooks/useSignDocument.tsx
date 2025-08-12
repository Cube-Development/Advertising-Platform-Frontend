import {
  CreateMessageKeyId,
  CreateMessageSignature,
  useGetTimestampMutation,
} from "@entities/organization";
import { useCryptoCertificates, useCryptoMessage } from "@shared/api";
import { useToast } from "@shared/ui";
import { useTranslation } from "react-i18next";
import {
  useCreateDocumentEDOMutation,
  useCreateSignEDOMutation,
  useGetSignInfoEDOMutation,
} from "../api";
import { ENUM_DOCUMENT_TYPE, ICreateDocumentEDORequest } from "../types";

export const useSignDocument = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const { sendMessage } = useCryptoMessage();
  const [getTimestamp, { isLoading: isLoadingLogin }] =
    useGetTimestampMutation();
  const [toSign, { isLoading: isLoadingToSign }] = useGetSignInfoEDOMutation();
  const [
    createSign,
    { isLoading: isLoadingCreateSign, isSuccess: isSuccessSigned },
  ] = useCreateSignEDOMutation();
  const [createDocument, { isLoading: isLoadingCreateDocument }] =
    useCreateDocumentEDOMutation();

  const { certificates, certificatesLoading, isSignatureLoading, error } =
    useCryptoCertificates();

  const signExist = async (documentId: string, owner: 0 | 1 = 0) => {
    try {
      // Получаем JSON документа для подписи
      const response = await toSign({ documentId, owner }).unwrap();
      const documentJson = response?.data?.json || {};
      await sign(documentJson, documentId);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : t("toasts.documents.sign.error");

      toast({
        variant: "error",
        title: errorMessage,
      });
    }
  };

  const create = async (
    data: ICreateDocumentEDORequest,
    type: ENUM_DOCUMENT_TYPE,
    oldKeyId?: string,
  ): Promise<{ id: string; keyId?: string } | undefined> => {
    try {
      const response = await createDocument({ data, type }).unwrap();
      const keyId = await sign(
        response?.pending_document?.document_json,
        response?._id?.toUpperCase(),
        oldKeyId,
      );

      if (!keyId) return;

      return { id: response?._id?.toUpperCase(), keyId };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : t("toasts.documents.create.error");

      toast({
        variant: "error",
        title: errorMessage,
      });
    }
  };

  const sign = async (
    documentJson: object,
    documentId: string,
    oldKeyId?: string,
  ): Promise<string | undefined> => {
    try {
      let keyId = oldKeyId;

      if (!keyId) {
        // Шаг 1: Загрузка ключа
        const keyResponse = await sendMessage(
          CreateMessageKeyId(certificates[0]),
        );
        keyId = keyResponse?.keyId as string;
      }

      if (!keyId) return;

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
      return keyId;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : t("toasts.documents.sign.error");

      toast({
        variant: "error",
        title: errorMessage,
      });
    }
  };

  return {
    signExist,
    create,
    isLoading:
      isLoadingLogin ||
      isLoadingToSign ||
      isLoadingCreateSign ||
      certificatesLoading ||
      isLoadingCreateDocument,

    isSignatureLoading,
    isSuccessSigned,
  };
};
