import {
  ICreateDepositRequest,
  useCreateDepositMutation,
  useCreateDepositRequestMutation,
} from "@entities/wallet";
import { useToast } from "@shared/ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useWalletDeposit = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [uploadUrl, setUploadUrl] = useState("");

  const [
    createDepositReq,
    {
      isLoading: isCreateDepositReqLoading,
      isSuccess: isCreateDepositReqSuccess,
    },
  ] = useCreateDepositRequestMutation();
  const [
    createDeposit,
    { isLoading: isCreateDepositLoading, isSuccess: isCreateDepositSuccess },
  ] = useCreateDepositMutation();

  const deposit = async (data: ICreateDepositRequest) => {
    try {
      const response = await createDepositReq({
        amount: data.amount,
      }).unwrap();

      await createDeposit({
        doc_id: response.payment_invoice_id,
      }).unwrap();

      toast({
        variant: "success",
        title: `${t("toasts.wallet.topup.success")}`,
      });

      setUploadUrl(response?.payment_invoice_url);
    } catch (error) {
      console.error("[DEPOSIT] error:", error);
      toast({
        variant: "error",
        title: t("toasts.wallet.topup.error"),
      });
    }
  };

  return {
    deposit,
    isLoading: isCreateDepositReqLoading || isCreateDepositLoading,
    isSuccess: isCreateDepositReqSuccess || isCreateDepositSuccess,
    uploadUrl,
  };
};
