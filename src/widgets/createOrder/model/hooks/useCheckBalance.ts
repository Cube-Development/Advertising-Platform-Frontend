import { ENUM_ROLES } from "@entities/user";
import { ENUM_WALLETS_TYPE } from "@entities/wallet";
import { useAppSelector } from "@shared/hooks";
import { useToast } from "@shared/ui";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const useCheckBalance = (
  wallet_type: ENUM_WALLETS_TYPE | undefined,
  amount: number = 0,
) => {
  const { deposit_wallet, profit_wallet, spending_wallet } = useAppSelector(
    (state) => state.wallet,
  );
  const { role } = useAppSelector((state) => state.user);
  const { toast } = useToast();
  const { t } = useTranslation();

  const current_wallet = useMemo(() => {
    if (wallet_type === ENUM_WALLETS_TYPE.DEPOSIT) {
      return deposit_wallet;
    } else if (wallet_type === ENUM_WALLETS_TYPE.PROFIT) {
      return profit_wallet;
    } else if (wallet_type === ENUM_WALLETS_TYPE.SPENDING) {
      return spending_wallet;
    } else {
      return 0;
    }
  }, [wallet_type, deposit_wallet, profit_wallet, spending_wallet]);

  const checkBalance = (): boolean => {
    if (current_wallet < amount && role === ENUM_ROLES.ADVERTISER) {
      toast({
        variant: "error",
        title: t("toasts.create_order.payment.not_enough_balance"),
      });
      return false;
    }
    return true;
  };

  return {
    checkBalance,
  };
};
