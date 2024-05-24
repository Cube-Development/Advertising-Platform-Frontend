import { PartnerList } from "@features/partnerList";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface PartnersProps {
  page: string;
}

export const Partners: FC<PartnersProps> = ({ page }) => {
  const { t } = useTranslation();

  return (
    <section className={styles.partners}>
      <h1 className={styles.partners__title}>{t(`${page}.partners_title`)}</h1>
      <div className={styles.partners__block}>
        <div>
          <PartnerList
            partners={t(`${page}.partners_list`, { returnObjects: true })}
          />
        </div>
        <div className={styles.bottom}>
          <PartnerList
            partners={t(`${page}.partners_list`, { returnObjects: true })}
            isLeft={true}
          />
        </div>
      </div>
    </section>
  );
};
