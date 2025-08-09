import {
  ICreateDepositRequest,
  useCreateDepositMutation,
  useCreateDepositRequestMutation,
} from "@entities/wallet";
import { useToast } from "@shared/ui";
import { useTranslation } from "react-i18next";

export const useWalletDeposit = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  let uploadUrl =
    "https://bxbbjhin8f.ufs.sh/f/uMaRQPscWxTC9NXMqnFJ8l6py5hWn7FMdSU1IZNOarxcLKEz";

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
        doc_id: response.doc_id,
      }).unwrap();

      toast({
        variant: "success",
        title: `${t("toasts.wallet.topup.success")}`,
      });

      uploadUrl =
        "https://bxbbjhin8f.ufs.sh/f/uMaRQPscWxTC9NXMqnFJ8l6py5hWn7FMdSU1IZNOarxcLKEz";
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
