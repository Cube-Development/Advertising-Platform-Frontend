import { BuyTarif } from "@features/buyTarif";
import { PriceList } from "@features/priceList";
import { KeyIcon } from "@shared/assets";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface TurnkeyProps {
  page: string;
}

export const Turnkey: FC<TurnkeyProps> = ({ page }) => {
  const { t } = useTranslation();

  return (
    <section className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.title}>
          <div>
            <KeyIcon />
          </div>
          <p>{t(`${page}.turnkey_title`)}</p>
        </div>
        <div className={styles.subtitle}>
          <p>{t(`${page}.turnkey_subtitle`)}</p>
        </div>
        <p className={styles.text}>{t(`${page}.turnkey_text`)}</p>
      </div>

      <PriceList
        tarifs={t(`${page}.tarifs_list`, { returnObjects: true })}
        buyBtn={<BuyTarif />}
      />
    </section>
  );
};
