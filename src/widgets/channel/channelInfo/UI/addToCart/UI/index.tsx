import { IReadChannelData } from "@entities/channel";
import { ICatalogChannel, IFormat } from "@entities/project";
import { FormatList } from "@features/catalog";
import { MyButton } from "@shared/ui";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface AddToCartProps {
  card: IReadChannelData;
  selectedFormat: IFormat;
  changeFormat: (selectedValue: IFormat) => void;
}

export const AddToCart: FC<AddToCartProps> = ({
  card,
  selectedFormat,
  changeFormat,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p>{t("channel.add_to_cart.title")}</p>
      </div>
      <div className={styles.format}>
        <p>{t("channel.add_to_cart.format")}</p>
        <div className={styles.formatList__wrapper}>
          <FormatList
            selectedFormat={selectedFormat}
            changeFormat={changeFormat}
            card={card as unknown as ICatalogChannel}
          />
        </div>
      </div>
      <div className={styles.price}>
        <p>{t("channel.add_to_cart.price")}</p>
        <span>
          {selectedFormat?.price.toLocaleString()} {t("symbol")}
        </span>
      </div>
      <MyButton className={styles.button}>
        <p>{t("channel.add_to_cart.button")}</p>
      </MyButton>
    </div>
  );
};
