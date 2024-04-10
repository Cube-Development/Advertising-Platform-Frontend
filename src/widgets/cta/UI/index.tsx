import { OptionCard } from "@entities/optionCard";
import { AddPlatform } from "@features/addPlatform";
import { SeeCatalog } from "@features/seeCatalog";
import { IOption } from "@shared/types/translate";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Element } from "react-scroll";

interface CtaProps {
  page: string;
}

export const Cta: FC<CtaProps> = ({ page }) => {
  const { t } = useTranslation();
  const options: IOption[] = t(`${page}.cta_list`, { returnObjects: true });

  return (
    <Element name="registration">
      <section id="registration" className={styles.cta__wrapper}>
        <div className="container">
          <div className={styles.cta__row}>
            <div className={styles.cta__right}>
              <h1 className={styles.cta__title}>{t(`${page}.cta_title`)}</h1>
              <h3 className={styles.cta__subtitle}>
                {t(`${page}.cta_subtitle`)}
              </h3>
              <div className={styles.options}>
                {options.map((option, index) => (
                  <OptionCard key={index} option={option} />
                ))}
              </div>
              {page === "main_page_advertiser" ? (
                <SeeCatalog />
              ) : (
                <AddPlatform />
              )}
            </div>
            <div>
              <img src={`/images/assets/${t(`${page}.main_img`)}`} alt="" />
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};
