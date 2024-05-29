import { InfoCard } from "@entities/infoCard";
import { IBasicInfo } from "@shared/types/translate";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ServicesProps {
  page: string;
}

export const Services: FC<ServicesProps> = ({ page }) => {
  const { t } = useTranslation();
  const infos: IBasicInfo[] = t(`${page}.services_list`, {
    returnObjects: true,
  });
  return (
    <section className={`${styles.wrapper} container`}>
      <h2 className={styles.title}>{t(`${page}.services_title`)}</h2>
      <div className={styles.infos}>
        {infos.map((info, index) => (
          <InfoCard key={index} info={info} />
        ))}
      </div>
    </section>
  );
};
