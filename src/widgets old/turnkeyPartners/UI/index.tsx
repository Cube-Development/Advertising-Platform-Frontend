import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { PartnerList } from "src/features old/partnerList";

interface TurnkeyPartnersProps {}

export const TurnkeyPartners: FC<TurnkeyPartnersProps> = () => {
  const { t } = useTranslation();
  return (
    <section className={styles.partners}>
      <div className={styles.partners__title}>
        <h1 className="container">{t(`turnkey.partners_title`)}</h1>
      </div>

      <div className={styles.partners__block}>
        <PartnerList
          partners={t(`main_page_advertiser.partners_list`, {
            returnObjects: true,
          })}
        />
      </div>
    </section>
  );
};
