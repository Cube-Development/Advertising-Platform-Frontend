import {
  ENUM_ORGANIZATION_STATUS,
  useGetOrganizationQuery,
} from "@entities/organization";
import { useAppSelector } from "@shared/hooks";
import { useEffect, useRef, useState } from "react";

export const useRenderOfferModal = () => {
  const { isAuthEcp, isOfferSign } = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const prevAuthRef = useRef(isAuthEcp);
  const hasShownRef = useRef(false);
  const { data: organization, isLoading } = useGetOrganizationQuery();

  useEffect(() => {
    if (isLoading) return;

    // Если пользователь вышел (true -> false), сбрасываем флаг
    if (prevAuthRef.current === true && isAuthEcp === false) {
      hasShownRef.current = false;
    }

    // Проверяем переход с false на true
    const wasUnauthorized = prevAuthRef.current === false;
    const nowAuthorized = isAuthEcp === true;

    if (
      wasUnauthorized &&
      nowAuthorized &&
      !hasShownRef.current &&
      (organization?.status !== ENUM_ORGANIZATION_STATUS.ACTIVE || !isOfferSign)
    ) {
      setOpen(true);
      hasShownRef.current = true;
    }

    prevAuthRef.current = isAuthEcp;
  }, [isAuthEcp, organization, isLoading]);

  return { open, setOpen };
};
