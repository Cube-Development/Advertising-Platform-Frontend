import {
  useCheckCommonCartPromocodeMutation,
  useCheckProjectCartPromocodeMutation,
} from "@entities/project";
import {
  cancelPromocodeApply,
  getPromocodeError,
  IPromocodeState,
  isPromocodeRejected,
  resetPromocode,
  selectIsPromocodeCurrent,
  selectPromocode,
  setPromocode,
  setPromocodeDiscount,
  startPromocodeApply,
} from "@entities/wallet";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { Input, MyButton, useToast } from "@shared/ui";
import { Loader, X } from "lucide-react";
import { FC, FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "react-redux";
import styles from "./styles.module.scss";

interface ApplyPromocodeProps {
  /** Сумма корзины: при её изменении скидка пересчитывается */
  amount?: number;
  /** Корзина сохранённого проекта: код проверяется по проекту и привязан к нему */
  projectId?: string | null;
}

/** Код своей корзины; код другой корзины (общей или другого проекта) здесь не виден */
export const ApplyPromocode: FC<ApplyPromocodeProps> = ({
  amount,
  projectId = null,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  // Ответы приходят позже: актуальное состояние читается в момент ответа
  const store = useStore<{ promocode: IPromocodeState }>();
  const { code } = useAppSelector(selectPromocode(projectId));
  const [value, setValue] = useState(code ?? "");

  const [checkCommonPromocode, { isLoading: isLoadingCommon }] =
    useCheckCommonCartPromocodeMutation();
  const [checkProjectPromocode, { isLoading: isLoadingProject }] =
    useCheckProjectCartPromocodeMutation();
  const isLoading = isLoadingCommon || isLoadingProject;

  const checkPromocode = (promocode: string) =>
    projectId
      ? checkProjectPromocode({ project_id: projectId, promocode })
      : checkCommonPromocode({ promocode });

  const showError = (err: unknown) => {
    const error = err as { data?: { message?: string } };
    const { key, amount } = getPromocodeError(error?.data?.message);
    toast({
      variant: "error",
      title: t(key, { amount }),
    });
  };

  const handleApply = async (event: FormEvent) => {
    event.preventDefault();
    const promocode = value.trim();
    if (!promocode || isLoading) return;

    // Ответ запишется, только если после него не начали другое применение и не вышли
    // из аккаунта. После ухода со страницы — запишется: код своей корзины ждёт в ней
    const applyId = nanoid();
    dispatch(startPromocodeApply(applyId));
    try {
      const discount = await checkPromocode(promocode).unwrap();
      dispatch(setPromocode({ code: promocode, projectId, discount, applyId }));
    } catch (error) {
      const isLatestApply = store.getState().promocode.applyId === applyId;
      dispatch(cancelPromocodeApply(applyId));
      console.error("Ошибка при применении промокода", error);
      // Ошибка применения, которое уже сменили другим, — не про текущий код
      if (isLatestApply) showError(error);
    }
  };

  const handleReset = () => {
    setValue("");
    dispatch(resetPromocode());
  };

  // Корзина изменилась — скидку и минимальную сумму нужно проверить заново
  useEffect(() => {
    if (!code || amount === undefined) return;

    // Ответ после ухода из корзины или нового пересчёта уже не про неё: без тоста и записи
    let isStale = false;
    const target = { code, projectId };
    checkPromocode(code)
      .unwrap()
      .then((discount) => {
        if (!isStale) dispatch(setPromocodeDiscount({ ...target, discount }));
      })
      .catch((error) => {
        // Код уже убрали крестиком или заменили — тост был бы про чужой код
        if (isStale || !selectIsPromocodeCurrent(target)(store.getState())) {
          return;
        }
        // Сеть, 5xx, таймаут — код не отвергнут: остаётся, экран оплаты проверит его снова
        if (!isPromocodeRejected(error)) {
          dispatch(setPromocodeDiscount({ ...target, discount: null }));
          return;
        }
        showError(error);
        dispatch(resetPromocode(target));
      });

    return () => {
      isStale = true;
    };
  }, [amount]);

  return (
    <form className={styles.wrapper} onSubmit={handleApply}>
      <div className={styles.field}>
        <Input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={t("cart.promocode.placeholder")}
          disabled={!!code}
          maxLength={64}
        />
        {code && (
          <button
            type="button"
            className={styles.reset}
            onClick={handleReset}
            aria-label={t("cart.promocode.remove")}
          >
            <X width={16} height={16} />
          </button>
        )}
      </div>
      {!code && (
        <MyButton
          type="submit"
          buttons_type="button__blue"
          className={styles.button}
          disabled={!value.trim() || isLoading}
        >
          {isLoading ? (
            <Loader
              className="animate-spin"
              stroke="#fff"
              width={18}
              height={18}
            />
          ) : (
            t("cart.promocode.apply")
          )}
        </MyButton>
      )}
    </form>
  );
};
