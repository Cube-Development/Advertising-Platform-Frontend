import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { IChannelFormat } from "@shared/types/platform";

export const FormatPrice: FC<IChannelFormat> = ({ big, small, id }) => {
  const { t } = useTranslation();
  const [price, setPrice] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9.]/g, "");
    if (newValue.length > 12) {
      return;
    }
    setPrice(newValue);
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
