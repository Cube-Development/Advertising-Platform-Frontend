import { useAppSelector } from "@shared/hooks";
import { useEffect, useState } from "react";

export const useMaxWithdraw = (amount: number) => {
  const { balance } = useAppSelector((state) => state.wallet);
  const [isMaxAmount, setIsMaxAmount] = useState(false);

  useEffect(() => {
    if (amount !== balance) {
      setIsMaxAmount(false);
    }
  }, [amount]);

  return {
    maxWithdraw: balance,
    isMaxAmount,
    setIsMaxAmount,
  };
};
