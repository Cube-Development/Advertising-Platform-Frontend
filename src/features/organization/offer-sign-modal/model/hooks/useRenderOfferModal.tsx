import {
  ENUM_ORGANIZATION_STATUS,
  useGetOrganizationQuery,
} from "@entities/organization";
import { offerOpen, USER_ROLES } from "@entities/user";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { useEffect, useRef, useState } from "react";

export const useRenderOfferModal = () => {
  const { isAuthEcp, isOfferSign, isOfferOpen, role, isAuth } = useAppSelector(
    (state) => state.user,
  );
  const [open, setOpen] = useState(false);
  const prevAuthRef = useRef(isAuthEcp);
  const hasShownRef = useRef(false);
  const dispatch = useAppDispatch();
  const { data: organization, isLoading } = useGetOrganizationQuery(undefined, {
    skip: !isAuth || !USER_ROLES.includes(role),
  });

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
      (wasUnauthorized &&
        nowAuthorized &&
        !hasShownRef.current &&
        (organization?.status !== ENUM_ORGANIZATION_STATUS.ACTIVE ||
          !isOfferSign)) ||
      isOfferOpen
    ) {
      setOpen(true);
      hasShownRef.current = true;
    }

    prevAuthRef.current = isAuthEcp;
  }, [isAuthEcp, organization, isLoading, isOfferOpen]);

  useEffect(() => {
    if (!open) {
      dispatch(offerOpen(false));
    }
  }, [open]);

  return { open, setOpen };
};
