import { BasketIcon } from "@shared/assets";
import { IAddToBasketProps, IFormat } from "@shared/types/platform";
import { MyButton } from "@shared/ui";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const AddToBasket: FC<IAddToBasketProps> = ({
  FormatList,
  selectedFormat,
  formats,
  changeFormat,
}) => {
  const { t } = useTranslation();
  return (
    <MyButton>
      <div className={styles.wrapper}>
        <FormatList
          selectedFormat={selectedFormat}
          changeFormat={changeFormat}
          formats={formats}
        />

        <div className={styles.price}>
          {selectedFormat.price.toLocaleString()} {t("symbol")}
          <BasketIcon />
        </div>
      </div>
    </MyButton>
  );
};
