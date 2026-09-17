import {
  buildPathWithQuery,
  QueryParams,
  queryParamKeys,
} from "@shared/utils";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  cardsCount: number;
  ordersCount: number;
  resetDateAndTime: () => void;
}

export const useResetDatetimeQuery = ({
  cardsCount,
  ordersCount,
  resetDateAndTime,
}: Props) => {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  const applied = useRef(false);
  const shouldReset =
    new URLSearchParams(search).get(queryParamKeys.resetDatetime) === "true";

  useEffect(() => {
    if (!shouldReset || applied.current) return;
    if (!cardsCount || ordersCount < cardsCount) return;

    applied.current = true;
    resetDateAndTime();

    const params = { ...QueryParams() };
    delete params[queryParamKeys.resetDatetime];
    navigate(`${buildPathWithQuery(pathname, params)}${hash}`, {
      replace: true,
    });
  }, [
    shouldReset,
    cardsCount,
    ordersCount,
    resetDateAndTime,
    pathname,
    hash,
    navigate,
  ]);
};
