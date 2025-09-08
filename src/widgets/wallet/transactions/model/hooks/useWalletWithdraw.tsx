import {
  ICreateWithdrawRequest,
  useCreateWithdrawMutation,
} from "@entities/wallet";
import { useToast } from "@shared/ui";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const useWalletWithdraw = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [createWithdraw, { isLoading, isSuccess }] =
    useCreateWithdrawMutation();

  const [uploadUrl, setUploadUrl] = useState("");

  const withdraw = async (data: ICreateWithdrawRequest) => {
    try {
      const response = await createWithdraw({
        amount: data?.amount,
        wallet_type: data?.wallet_type,
      }).unwrap();

      // toast({
      //   variant: "success",
      //   title: `${t("toasts.wallet.withdraw.success")}`,
      // });

      setUploadUrl(response?.refund_letter_url);
    } catch (error) {
      console.error("[WITHDRAW] error:", error);
      toast({
        variant: "error",
        title: t("toasts.wallet.withdraw.error"),
      });
    }
  };

  return {
    withdraw,
    isLoading,
    isSuccess,
    uploadUrl,
  };
};
