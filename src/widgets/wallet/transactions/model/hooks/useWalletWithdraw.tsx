import {
  ICreateWithdrawRequest,
  useCreateWithdrawMutation,
} from "@entities/wallet";
import { useToast } from "@shared/ui";
import { useTranslation } from "react-i18next";

export const useWalletWithdraw = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [createWithdraw, { isLoading, isSuccess }] =
    useCreateWithdrawMutation();

  let uploadUrl =
    "https://bxbbjhin8f.ufs.sh/f/uMaRQPscWxTCZJIbbXmWQb1RphaovDjL4z82dBVnPXg59sEG";

  const withdraw = async (data: ICreateWithdrawRequest) => {
    try {
      await createWithdraw({
        amount: data?.amount,
        wallet_type: data?.wallet_type,
      }).unwrap();

      toast({
        variant: "success",
        title: `${t("toasts.wallet.withdraw.success")}`,
      });

      uploadUrl =
        "https://bxbbjhin8f.ufs.sh/f/uMaRQPscWxTCZJIbbXmWQb1RphaovDjL4z82dBVnPXg59sEG";
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
