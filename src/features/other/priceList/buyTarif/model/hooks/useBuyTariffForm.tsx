import { tariffData, TariffParameters } from "@entities/project";
import { ENUM_WALLETS_TYPE } from "@entities/wallet";
import { useAppSelector } from "@shared/hooks";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { IBuyTariffForm } from "../types";

export const useBuyTariffForm = (tariff: number) => {
  const tariffPrice =
    TariffParameters.find((item) => item.index === tariff)?.price || 0;

  const { deposit_wallet, profit_wallet, spending_wallet } = useAppSelector(
    (state) => state.wallet,
  );

  const checkHaveBalance = useMemo(() => {
    const maxBalance = Math.max(deposit_wallet, profit_wallet, spending_wallet);
    return tariffPrice <= maxBalance;
  }, [deposit_wallet, profit_wallet, spending_wallet, tariffPrice]);

  const initialState = {
    tariff_ident: tariff,
    comment: "",
    links: [],
    attached_files: [],
    url: "",
    files: [],
    wallet_type: null,
    dragActive: false,
    isTarifBought: false,
    isHaveBalance: checkHaveBalance,
    isDropFile: false,
    uploadProgress: {},
  };

  const { setValue, watch, reset } = useForm<IBuyTariffForm>({
    defaultValues: {
      ...initialState,
    },
  });
  const formState = watch();

  const currentBalance = useMemo(() => {
    if (formState?.wallet_type === ENUM_WALLETS_TYPE.DEPOSIT)
      return deposit_wallet;
    if (formState?.wallet_type === ENUM_WALLETS_TYPE.PROFIT)
      return profit_wallet;
    if (formState?.wallet_type === ENUM_WALLETS_TYPE.SPENDING)
      return spending_wallet;
    return 0;
  }, [deposit_wallet, profit_wallet, spending_wallet]);

  useEffect(() => {
    if (checkHaveBalance) {
      setValue(tariffData.isHaveBalance, checkHaveBalance);
    }
  }, [checkHaveBalance]);

  const resetForm = () => {
    reset({ ...initialState, isTarifBought: true });
  };

  return {
    formState,
    setValue,
    resetForm,
    tariffPrice,
    currentBalance,
  };
};
