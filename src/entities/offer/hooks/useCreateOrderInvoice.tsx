import { useSignDocument } from "@entities/documents";
import { useToast } from "@shared/ui";
import { useTranslation } from "react-i18next";
import {
  useGetInvoiceInfoMutation,
  useOrderAcceptFinallyMutation,
} from "../api";
import { INVOICE_STATUS } from "../config";
import { clear, get, setSigned } from "../helpers";
import { ENUM_INVOICE_TYPE } from "../types";

const createAndSignLocks = new Map<string, boolean>();

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
    if (createAndSignLocks.has(order_id)) return;
    createAndSignLocks.set(order_id, true);

    try {
      const stored = get(order_id);

      let invoiceData: { id: string; keyId?: string } | undefined;

      if (stored.invoice) {
        invoiceData = { id: stored.invoice.id };
      } else {
        const invoiceInfo = await docInfo({
          order_id,
          doc_type: ENUM_INVOICE_TYPE.INVOICE,
        }).unwrap();
        invoiceData = await create(
          { data: invoiceInfo },
          INVOICE_STATUS[ENUM_INVOICE_TYPE.INVOICE],
          undefined,
          (id) => setSigned(order_id, ENUM_INVOICE_TYPE.INVOICE, id),
        );
      }

      if (!invoiceData) return;

      let actData: { id: string; keyId?: string } | undefined;

      if (stored.act) {
        actData = { id: stored.act.id };
      } else {
        const actInfo = await docInfo({
          order_id,
          doc_type: ENUM_INVOICE_TYPE.ACT,
        }).unwrap();
        actData = await create(
          { data: actInfo },
          INVOICE_STATUS[ENUM_INVOICE_TYPE.ACT],
          invoiceData.keyId,
          (id) => setSigned(order_id, ENUM_INVOICE_TYPE.ACT, id),
        );
      }

      if (!actData) return;

      await accept({
        order_id,
        invoice_doc_id: invoiceData.id || "",
        act_doc_id: actData.id || "",
      }).unwrap();
      clear(order_id);
    } catch (error) {
      toast({
        variant: "error",
        title: t("toasts.documents.sign.error"),
      });
    } finally {
      createAndSignLocks.delete(order_id);
    }
  };

  return {
    createAndSign,
    isLoading: isLoadingCreateDocument || isLoadingInfo || isLoadingAccept,
    isSignatureLoading,
  };
};
