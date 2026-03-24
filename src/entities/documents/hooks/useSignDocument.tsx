import {
  filterCertificates,
  useGetOrganizationQuery,
  useGetTimestampMutation,
  useJoinSignEDOMutation,
} from "@entities/organization";
import { useCryptoCertificates } from "@shared/api";
import { useToast } from "@shared/ui";
import { useTranslation } from "react-i18next";
import {
  useCreateDocumentEDOMutation,
  useCreateSignEDOMutation,
  useGetDocumentBase64EDOMutation,
  useGetSignInfoEDOMutation,
} from "../api";
import { ENUM_DOCUMENT_TYPE, ICreateDocumentEDORequest } from "../types";

export const useSignDocument = () => {
  const { toast } = useToast();
  const { t } = useTranslation();

  const { data: organization } = useGetOrganizationQuery();

  const [getTimestamp, { isLoading: isLoadingLogin }] =
    useGetTimestampMutation();
  const [toSign, { isLoading: isLoadingToSign }] = useGetSignInfoEDOMutation();
  const [createSign, { isLoading: isLoadingCreateSign }] =
    useCreateSignEDOMutation();
  const [getDocumentBase64, { isLoading: isLoadingBase64 }] =
    useGetDocumentBase64EDOMutation();
  const [joinSign, { isLoading: isLoadingJoin }] = useJoinSignEDOMutation();
  const [createDocument, { isLoading: isLoadingCreateDocument }] =
    useCreateDocumentEDOMutation();

  const {
    certificates,
    certificatesLoading,
    isSignatureLoading,
    error,
    isOutdatedVersion,
    loadKey,
    createSignature,
    createAttachedSignature,
  } = useCryptoCertificates();

  const signExist = async (
    documentId: string,
    owner: 0 | 1 = 0,
  ): Promise<boolean> => {
    try {
      // Получаем JSON документа для подписи
      const response = await toSign({ documentId, owner }).unwrap();
      const documentJson = response?.data?.json || {};
      const toSignData = response?.data?.toSign || "";
      const keyId = await sign(
        documentJson,
        documentId,
        undefined,
        owner,
        toSignData,
      );
      return !!keyId;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : t("toasts.documents.sign.error");

      toast({
        variant: "error",
        title: errorMessage,
      });

      return false;
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
        1,
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
    owner?: 0 | 1,
    toSignData?: string,
  ): Promise<string | undefined> => {
    try {
      let keyId = oldKeyId;

      const currentCert = filterCertificates(
        certificates,
        organization?.PINFL,
        organization?.TIN,
      )?.[0];

      if (!keyId) {
        keyId = await loadKey(currentCert);
      }

      if (!keyId) return;

      if (!isOutdatedVersion) {
        // ===== НОВЫЙ ПАЙПЛАЙН (E-IMZO >= 4.86) =====

        // 1. Получение Base64 документа
        const base64Response = await getDocumentBase64({ documentId }).unwrap();
        const base64Data = base64Response?.data || "";

        // 2. Создание PKCS7 подписи из Base64
        const signResponse = await createSignature(keyId, base64Data, false);

        // 3. Прикрепление TimeStamp
        const timestampResponse = await getTimestamp({
          pkcs7: signResponse.pkcs7,
          signatureHex: signResponse.signatureHex,
        }).unwrap();

        const timeStampTokenB64 = timestampResponse?.timeStampTokenB64 || "";

        // 4. DSVS-склейка (Join / Акцепт)
        const joinResponse = await joinSign({
          signature1: toSignData || "",
          signature2: timeStampTokenB64,
        }).unwrap();

        const signature = joinResponse?.pkcs7B64;

        // 5. Утверждение документа
        await createSign({ documentId, signature }).unwrap();
      } else {
        // ===== СТАРЫЙ ПАЙПЛАЙН (E-IMZO < 4.86) =====

        // 1. Создание подписи из JSON
        const jsonString = JSON.stringify(documentJson);
        const signResponse =
          owner === 1
            ? await createSignature(keyId, jsonString)
            : await createAttachedSignature(keyId, toSignData || "");

        // 2. Прикрепление TimeStamp
        const timestampResponse = await getTimestamp({
          pkcs7: signResponse.pkcs7,
          signatureHex: signResponse.signatureHex,
        }).unwrap();

        const signature = timestampResponse?.timeStampTokenB64 || "";

        // 3. Утверждение документа
        await createSign({ documentId, signature }).unwrap();
      }

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
      // isLoadingCreateSignNew ||
      isLoadingBase64 ||
      isLoadingJoin ||
      certificatesLoading ||
      isLoadingCreateDocument,

    isSignatureLoading,
  };
};
