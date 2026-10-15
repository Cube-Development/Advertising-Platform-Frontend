import { useCheckCommonCartPromocodeMutation } from "@entities/project";
import {
  getPromocodeError,
  resetPromocode,
  setPromocode,
  setPromocodeDiscount,
} from "@entities/wallet";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { Input, MyButton, useToast } from "@shared/ui";
import { Loader, X } from "lucide-react";
import { FC, FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ApplyPromocodeProps {
  /** Сумма корзины: при её изменении скидка пересчитывается */
  amount?: number;
}

export const ApplyPromocode: FC<ApplyPromocodeProps> = ({ amount }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { code } = useAppSelector((state) => state.promocode);
  const [value, setValue] = useState(code ?? "");

  const [checkPromocode, { isLoading }] = useCheckCommonCartPromocodeMutation();

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

    try {
      const discount = await checkPromocode({ promocode }).unwrap();
      dispatch(setPromocode({ code: promocode, discount }));
    } catch (error) {
      showError(error);
      console.error("Ошибка при применении промокода", error);
    }
  };

  const handleReset = () => {
    setValue("");
    dispatch(resetPromocode());
  };

  // Корзина изменилась — скидку и минимальную сумму нужно проверить заново
  useEffect(() => {
    if (!code || amount === undefined) return;

    checkPromocode({ promocode: code })
      .unwrap()
      .then((discount) => dispatch(setPromocodeDiscount(discount)))
      .catch((error) => {
        showError(error);
        dispatch(resetPromocode());
      });
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
