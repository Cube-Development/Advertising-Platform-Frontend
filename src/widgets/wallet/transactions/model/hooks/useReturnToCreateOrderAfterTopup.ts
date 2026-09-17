import {
  ENUM_WALLETS_TYPE,
  IGetBalance,
  useGetBalanceQuery,
} from "@entities/wallet";
import { ENUM_PATHS } from "@shared/routing";
import {
  buildPathWithQuery,
  queryParamKeys,
  QueryParamsUUID,
} from "@shared/utils";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const getDepositBalance = (items?: IGetBalance["items"]) =>
  items?.find((item) => item.wallet === ENUM_WALLETS_TYPE.DEPOSIT)?.balance ?? 0;

export const useReturnToCreateOrderAfterTopup = () => {
  const projectId = QueryParamsUUID(queryParamKeys.projectId);
  const navigate = useNavigate();
  const initialDeposit = useRef<number | null>(null);

  const { data, isSuccess, refetch } = useGetBalanceQuery(undefined, {
    skip: !projectId,
  });

  useEffect(() => {
    if (!projectId || !isSuccess || initialDeposit.current !== null) return;
    initialDeposit.current = getDepositBalance(data?.items);
  }, [projectId, isSuccess, data]);

  useEffect(() => {
    if (!projectId || initialDeposit.current === null || !isSuccess) return;
    const deposit = getDepositBalance(data?.items);
    if (deposit > initialDeposit.current) {
      navigate(
        `${buildPathWithQuery(ENUM_PATHS.CREATE_ORDER, {
          [queryParamKeys.projectId]: projectId,
        })}#payment`,
      );
    }
  }, [data, isSuccess, projectId, navigate]);

  useEffect(() => {
    if (!projectId) return;

    const check = () => {
      void refetch();
    };

    const onFocus = () => {
      check();
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") check();
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [projectId, refetch]);
};
