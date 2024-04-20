import { IFormatPriceProps } from "@shared/types/platform";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const FormatPrice: FC<IFormatPriceProps> = ({
  big,
  small,
  id,
  onChange,
  defaultValue,
}) => {
  const { t } = useTranslation();
  const [price, setPrice] = useState(defaultValue || "");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9.]/g, "");
    if (newValue.length > 12 || newValue == "0") {
      return;
    }
    setPrice(newValue);
    onChange({
      name: id,
      price: newValue.length ? Number(newValue) : 0,
    });
  };
  const formattedPrice = price === "" ? "" : Number(price).toLocaleString();

  return (
    <div className={styles.wrapper}>
      <div
        // className={price === "" ? styles.no__active : styles.active}
        className={`${styles.button}  ${price === "" ? styles.no__active : styles.active}`}
      >
        {big}
      </div>
      <div className={styles.input}>
        <input
          value={formattedPrice}
          onChange={handleInput}
          placeholder={t("add_platform.price.default")}
        ></input>
        <p>{t("symbol")}</p>
      </div>
    </div>
  );
};
