import { useState, useEffect } from "react";
import {
  ICart,
  useReadCommonCartShortQuery,
  useReadManagerCartQuery,
  useReadPublicCartShortQuery,
} from "@entities/project";
import { ENUM_ROLES } from "@entities/user";
import { USER_LANGUAGES_LIST } from "@shared/languages";

export const useChannelCartFetch = (
  isAuth: boolean,
  role: ENUM_ROLES,
  guestId: string,
  projectId: string,
  language: number,
) => {
  const { data: cart, isFetching: isFetchingCommon } =
    useReadCommonCartShortQuery(undefined, {
      skip: !isAuth || !!projectId || role !== ENUM_ROLES.ADVERTISER,
      refetchOnMountOrArgChange: true,
    });

  const { data: cartPub, isFetching: isFetchingPublic } =
    useReadPublicCartShortQuery(
      { guest_id: guestId },
      {
        skip: isAuth || !guestId || !!projectId,
        refetchOnMountOrArgChange: true,
      },
    );

  const { data: cartManager, isFetching: isFetchingManager } =
    useReadManagerCartQuery(
      {
        project_id: projectId,
        language: language || USER_LANGUAGES_LIST[0].id,
      },
      { skip: !isAuth || !projectId, refetchOnMountOrArgChange: true },
    );

  const [currentCart, setCurrentCart] = useState<ICart | undefined>(
    cart || cartPub || cartManager,
  );

  useEffect(() => {
    if (isAuth && !projectId && cart) setCurrentCart(cart);
    else if (!isAuth && guestId && cartPub) setCurrentCart(cartPub);
    else if (isAuth && projectId && cartManager) setCurrentCart(cartManager);
  }, [cart, cartPub, cartManager, isAuth, projectId, guestId]);

  const isFetchingCart =
    isFetchingCommon || isFetchingPublic || isFetchingManager;

  return { currentCart, isFetchingCart };
};
