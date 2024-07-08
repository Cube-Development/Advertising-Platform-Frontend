import { FC, useEffect } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { PriceList } from "src/features old/priceList";
import { BuyTarif } from "src/features old/buyTarif";

interface TurnkeyTopProps {}

export const TurnkeyTop: FC<TurnkeyTopProps> = () => {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <section className="container">
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h1>{t("turnkey.turnkey")}</h1>
          <h2>{t("turnkey.text")}</h2>
        </div>
        <PriceList
          tarifs={t(`main_page_advertiser.tarifs_list`, {
            returnObjects: true,
          })}
          buyBtn={<BuyTarif />}
        />
      </div>
    </section>
  );
};
