import { ENUM_ROLES } from "@entities/user";
import {
  getPromocodeError,
  isPromocodeRejected,
  resetPromocode,
  selectPromocode,
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
 * ровно та сумма, что спишется. Баланс сравнивается с payableAmount.
 * Берётся только код, привязанный к этому проекту: из его корзины или из общей
 * корзины, из которой проект создан
 */
export const usePaymentPromocode = ({
  projectId,
  role,
  totalAmount,
}: Props) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { code, discount } = useAppSelector(selectPromocode(projectId));
  const [checkPromocode] = useCheckPaymentPromocodeMutation();

  const isActive = role === ENUM_ROLES.ADVERTISER && !!code;

  useEffect(() => {
    if (!isActive || !code || !totalAmount) return;

    // Ответ после ухода со страницы или нового пересчёта уже не про неё: без тоста и записи
    let isStale = false;
    const target = { code, projectId };
    checkPromocode({ project_id: projectId, promocode: code })
      .unwrap()
      .then((discount) => {
        if (!isStale) dispatch(setPromocodeDiscount({ ...target, discount }));
      })
      .catch((err: unknown) => {
        if (isStale) return;
        // Сеть, 5xx — код не отвергнут: остаётся и уйдёт в оплату, бэкенд проверит его
        // там сам. Скидку не показываем: баланс сверяется с полной суммой — с запасом
        if (!isPromocodeRejected(err)) {
          dispatch(setPromocodeDiscount({ ...target, discount: null }));
          return;
        }
        const error = err as { data?: { message?: string } };
        const { key, amount } = getPromocodeError(error?.data?.message);
        toast({ variant: "error", title: t(key, { amount }) });
        dispatch(resetPromocode(target));
      });

    return () => {
      isStale = true;
    };
  }, [isActive, projectId, totalAmount]);

  return {
    payableAmount: isActive && discount ? discount.amount_after : totalAmount,
    amountBefore: isActive && discount ? discount.amount_before : undefined,
  };
};
