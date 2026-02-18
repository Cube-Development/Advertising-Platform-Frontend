import {
  ADMIN_ACCOUNTING_TYPE,
  invalidateAccounting,
  useAccountingDepositAcceptMutation,
  useAccountingWithdrawalAcceptMutation,
} from "@entities/admin";
import { useAppDispatch } from "@shared/hooks";
import { MyButton, useToast } from "@shared/ui";
import { Loader2, PenTool } from "lucide-react";
import { FC, MouseEvent } from "react";
import { useTranslation } from "react-i18next";

interface ISignAccountingProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  documentId: string;
  userId: string;
  batchId: string;
  transaction_type: ADMIN_ACCOUNTING_TYPE;
}

export const SignAccounting: FC<ISignAccountingProps> = ({
  documentId,
  userId,
  batchId,
  transaction_type,
  ...props
}) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { t } = useTranslation();
  const { onClick, disabled, ...rest } = props;

  const [deposit, { isLoading: isLoadingDeposit }] =
    useAccountingDepositAcceptMutation();

  const [withdrawal, { isLoading: isLoadingWithdrawal }] =
    useAccountingWithdrawalAcceptMutation();

  const handleSign = async () => {
    if (
      !userId ||
      !batchId ||
      !transaction_type ||
      isLoadingDeposit ||
      isLoadingWithdrawal
    )
      return;

    try {
      if (transaction_type === ADMIN_ACCOUNTING_TYPE.TOP_UP) {
        await deposit({ doc_id: documentId, user_id: userId }).unwrap();
      } else if (transaction_type === ADMIN_ACCOUNTING_TYPE.WITHDRAW) {
        await withdrawal({ batch_id: batchId }).unwrap();
      }

      await invalidateAccounting({
        dispatch,
        id: batchId,
      });

      toast({
        variant: "success",
        title: t("toasts.admin.accounting.sign.success"),
      });
    } catch (error) {
      console.error("[SIGN] error:", error);
      toast({
        variant: "error",
        title: t("toasts.admin.accounting.sign.error"),
      });
    }
  };

  return (
    <MyButton
      {...rest}
      disabled={disabled || isLoadingDeposit || isLoadingWithdrawal}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        handleSign();
        onClick && onClick?.(e);
      }}
    >
      <PenTool size={18} />
      {disabled
        ? t("admin_panel.accounting.card.buttons.signed")
        : t("admin_panel.accounting.card.buttons.sign")}
      {(isLoadingDeposit || isLoadingWithdrawal) && (
        <Loader2 className="animate-spin" size={20} />
      )}
    </MyButton>
  );
};
