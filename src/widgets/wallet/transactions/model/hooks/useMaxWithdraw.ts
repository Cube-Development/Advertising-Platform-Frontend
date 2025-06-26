import { ENUM_WALLETS_TYPE } from "@entities/wallet";
import { useAppSelector } from "@shared/hooks";
import { useEffect, useState } from "react";

export const useMaxWithdraw = (
  amount: number,
  walletType: ENUM_WALLETS_TYPE,
) => {
  const { deposit_wallet, profit_wallet } = useAppSelector(
    (state) => state.wallet,
  );

  let balance = 0;
  if (walletType === ENUM_WALLETS_TYPE.DEPOSIT) {
    balance = deposit_wallet;
  } else if (walletType === ENUM_WALLETS_TYPE.PROFIT) {
    balance = profit_wallet;
  }

  const [isMaxAmount, setIsMaxAmount] = useState(false);

  useEffect(() => {
    if (amount !== balance) {
      setIsMaxAmount(false);
    }
  }, [amount]);

  useEffect(() => {
    setIsMaxAmount(false);
  }, [walletType]);

  return {
    maxWithdraw: balance,
    isMaxAmount,
    setIsMaxAmount,
  };
};
