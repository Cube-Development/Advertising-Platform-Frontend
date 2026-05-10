import {
  ADMIN_ACCOUNTING_TYPE,
  invalidateAccounting,
  useAccountingDepositRejectMutation,
  useAccountingWithdrawalRejectMutation,
} from "@entities/admin";
import { useAppDispatch } from "@shared/hooks";
import { MyButton, useToast } from "@shared/ui";
import { Loader2, X } from "lucide-react";
import { FC, MouseEvent } from "react";
import { useTranslation } from "react-i18next";

interface IUnsignAccountingProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  batchId: string;
  transaction_type: ADMIN_ACCOUNTING_TYPE;
}

export const UnsignAccounting: FC<IUnsignAccountingProps> = ({
  batchId,
  transaction_type,
  ...props
}) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const { t } = useTranslation();
  const { onClick, disabled, ...rest } = props;

  const [deposit, { isLoading: isLoadingDeposit }] =
    useAccountingDepositRejectMutation();

  const [withdrawal, { isLoading: isLoadingWithdrawal }] =
    useAccountingWithdrawalRejectMutation();

  const handleSign = async () => {
    if (
      !batchId ||
      !transaction_type ||
      isLoadingDeposit ||
      isLoadingWithdrawal
    )
      return;

    try {
      if (transaction_type === ADMIN_ACCOUNTING_TYPE.TOP_UP) {
        await deposit({ batch_id: batchId }).unwrap();
      } else if (transaction_type === ADMIN_ACCOUNTING_TYPE.WITHDRAW) {
        await withdrawal({ batch_id: batchId }).unwrap();
      } else if (transaction_type === ADMIN_ACCOUNTING_TYPE.REFUND) {
        await withdrawal({ batch_id: batchId }).unwrap();
      }

      await invalidateAccounting({
        dispatch,
        id: batchId,
      });

      toast({
        variant: "success",
        title: t("toasts.admin.accounting.unsign.success"),
      });
    } catch (error) {
      console.error("[UNSIGN] error:", error);
      toast({
        variant: "error",
        title: t("toasts.admin.accounting.unsign.error"),
      });
    }
  };

  return (
    <MyButton
      {...rest}
      buttons_type="button__orange"
      disabled={disabled || isLoadingDeposit || isLoadingWithdrawal}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        handleSign();
        onClick && onClick?.(e);
      }}
    >
      <X size={18} />
      {disabled
        ? t("admin_panel.accounting.card.buttons.unsigned")
        : t("admin_panel.accounting.card.buttons.unsign")}
      {(isLoadingDeposit || isLoadingWithdrawal) && (
        <Loader2 className="animate-spin" size={20} />
      )}
    </MyButton>
  );
};
