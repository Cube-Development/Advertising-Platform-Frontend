import {
  ENUM_ORGANIZATION_STATUS,
  useGetOrganizationQuery,
} from "@entities/organization";
import { useAppSelector } from "@shared/hooks";
import { useEffect, useRef, useState } from "react";

export const useRenderOfferModal = () => {
  // const { isAuthEcp } = useAppSelector((state) => state.user);
  // const hasTriggeredModal = useRef(false);
  // const prevAuthRef = useRef(isAuthEcp);
  // const { data: organization, isLoading } = useGetOrganizationQuery();
  // const [isShowModal, setIsShowModal] = useState(false);

  // useEffect(() => {
  //   const becameAuthorized = !prevAuthRef.current;
  //   prevAuthRef.current = isAuthEcp; // обновляем

  //   const shouldShow =
  //     becameAuthorized &&
  //     // isAuthEcp &&
  //     organization?.status !== ENUM_ORGANIZATION_STATUS.ACTIVE &&
  //     !hasTriggeredModal.current;

  //   if (shouldShow) {
  //     hasTriggeredModal.current = true;
  //     setIsShowModal(true);
  //   }
  // }, [isAuthEcp, organization?.status, isLoading]);

  const { isAuthEcp } = useAppSelector((state) => state.user);
  const hasTriggeredModal = useRef(false);
  const prevAuthRef = useRef(isAuthEcp);
  const { data: organization, isLoading } = useGetOrganizationQuery();
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    if (!isAuthEcp) return;
    if (isLoading) return;
    if (!organization) return;

    const becameAuthorized = !prevAuthRef.current;
    prevAuthRef.current = isAuthEcp; // обновляем

    const shouldShow =
      becameAuthorized &&
      organization?.status !== ENUM_ORGANIZATION_STATUS.ACTIVE &&
      !hasTriggeredModal.current;

    if (shouldShow) {
      hasTriggeredModal.current = true;
      setIsShowModal(true);
    }
  }, [isAuthEcp, organization?.status, isLoading]);

  return {
    isShowModal,
    setIsShowModal,
  };
};
