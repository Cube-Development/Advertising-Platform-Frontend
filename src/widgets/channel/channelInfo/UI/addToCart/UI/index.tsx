import { ICatalogChannel, IFormat } from "@entities/project";
import { FormatList } from "@features/catalog";
import { MyButton } from "@shared/ui";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { IReadChannelData } from "@entities/channel";

interface AddToCartProps {
  card: IReadChannelData;
}

export const AddToCart: FC<AddToCartProps> = ({ card }) => {
  const { t } = useTranslation();
  const startFormat = card?.format[0];
  const [selectedFormat, setSelectedFormat] = useState<IFormat>(startFormat);

  useEffect(() => {
    setSelectedFormat(startFormat);
  }, [startFormat]);

  const handleChangeFormat = (selectedValue: IFormat) => {
    setSelectedFormat(selectedValue);
  };

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
            changeFormat={handleChangeFormat}
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
