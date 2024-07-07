import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { PartnerList } from "@features/partnerList";

interface PartnersProps {}

export const Partners: FC<PartnersProps> = () => {
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
