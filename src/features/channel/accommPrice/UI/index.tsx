import { IFormatPriceProps } from "@entities/channel";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { BREAKPOINT } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";

export const FormatPrice: FC<IFormatPriceProps> = ({
  big,
  small,
  id,
  onChange,
  defaultValue,
}) => {
  const { t } = useTranslation();
  const [price, setPrice] = useState(defaultValue || "");
  const screen = useWindowWidth();

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

  useEffect(() => {
    if (defaultValue) {
      setPrice(defaultValue);
    }
  }, [defaultValue]);

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.button}  ${price === "" ? styles.no__active : styles.active}`}
      >
        {screen > BREAKPOINT.MD ? big : small}
      </div>
      <div className={styles.input}>
        <input
          value={formattedPrice}
          onChange={handleInput}
          placeholder={t("add_platform.description.price.default")}
        ></input>
        <p>{t("symbol")}</p>
      </div>
    </div>
  );
};
