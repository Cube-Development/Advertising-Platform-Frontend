import { useSignDocument } from "@entities/documents";
import { useToast } from "@shared/ui";
import { useTranslation } from "react-i18next";
import {
  useGetInvoiceInfoMutation,
  useOrderAcceptFinallyMutation,
} from "../api";
import { INVOICE_STATUS } from "../config";
import { ENUM_INVOICE_TYPE } from "../types";

export const useCreateOrderInvoice = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const {
    create,
    isLoading: isLoadingCreateDocument,
    isSignatureLoading,
  } = useSignDocument();
  const [docInfo, { isLoading: isLoadingInfo }] = useGetInvoiceInfoMutation();
  const [accept, { isLoading: isLoadingAccept }] =
    useOrderAcceptFinallyMutation();

  const createAndSign = async (order_id: string) => {
    try {
      const invoiceInfo = await docInfo({
        order_id,
        doc_type: ENUM_INVOICE_TYPE.INVOICE,
      }).unwrap();
      const invoiceData = await create(
        { data: invoiceInfo },
        INVOICE_STATUS[ENUM_INVOICE_TYPE.INVOICE],
      );

      if (!invoiceData) return;

      const actInfo = await docInfo({
        order_id,
        doc_type: ENUM_INVOICE_TYPE.ACT,
      }).unwrap();
      const actData = await create(
        { data: actInfo },
        INVOICE_STATUS[ENUM_INVOICE_TYPE.ACT],
        invoiceData?.keyId,
      );

      if (!actData) return;

      await accept({
        order_id,
        invoice_doc_id: invoiceData?.id || "",
        act_doc_id: actData?.id || "",
      }).unwrap();
    } catch (error) {
      toast({
        variant: "error",
        title: t("toasts.documents.sign.error"),
      });
    }
  };

  return {
    createAndSign,
    isLoading: isLoadingCreateDocument || isLoadingInfo || isLoadingAccept,
    isSignatureLoading,
  };
};
