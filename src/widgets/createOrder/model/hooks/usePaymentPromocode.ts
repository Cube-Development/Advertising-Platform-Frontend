import { ENUM_ROLES } from "@entities/user";
import {
  getPromocodeError,
  resetPromocode,
  setPromocodeDiscount,
  useCheckPaymentPromocodeMutation,
} from "@entities/wallet";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { useToast } from "@shared/ui";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  projectId: string;
  role: ENUM_ROLES;
  totalAmount: number;
}

/**
 * Промокод из корзины на экране оплаты: скидка пересчитывается по заказам проекта —
 * ровно та сумма, что спишется. Баланс сравнивается с payableAmount
 */
export const usePaymentPromocode = ({
  projectId,
  role,
  totalAmount,
}: Props) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { code, discount } = useAppSelector((state) => state.promocode);
  const [checkPromocode] = useCheckPaymentPromocodeMutation();

  const isActive = role === ENUM_ROLES.ADVERTISER && !!code;

  useEffect(() => {
    if (!isActive || !totalAmount) return;

    checkPromocode({ project_id: projectId, promocode: code! })
      .unwrap()
      .then((data) => dispatch(setPromocodeDiscount(data)))
      .catch((err: unknown) => {
        const error = err as { data?: { message?: string } };
        const { key, amount } = getPromocodeError(error?.data?.message);
        toast({ variant: "error", title: t(key, { amount }) });
        dispatch(resetPromocode());
      });
  }, [isActive, projectId, totalAmount]);

  return {
    payableAmount: isActive && discount ? discount.amount_after : totalAmount,
    amountBefore: isActive && discount ? discount.amount_before : undefined,
  };
};
