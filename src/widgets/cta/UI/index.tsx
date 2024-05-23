import { OptionCard } from "@entities/optionCard";
import { AddPlatform } from "@features/addPlatform";
import { SeeCatalog } from "@features/seeCatalog";
import { addChannelQueries } from "@shared/config/addChannelQueries";
import { paths } from "@shared/routing";
import { IOption } from "@shared/types/translate";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Element } from "react-scroll";
import styles from "./styles.module.scss";

interface CtaProps {
  page: string;
}

export const Cta: FC<CtaProps> = ({ page }) => {
  const { t } = useTranslation();
  const options: IOption[] = t(`${page}.cta_list`, { returnObjects: true });

  return (
    <Element name="registration" className="container">
      <div id="registration" className={styles.wrapper}>
        <div className={styles.cta}>
          <div className={styles.cta__content}>
            <h1 className={styles.cta__content__title}>
              {t(`${page}.cta_title`)}
            </h1>
            <h2 className={styles.cta__content__subtitle}>
              {t(`${page}.cta_subtitle`)}
            </h2>
          </div>
          <div className={styles.cta__options}>
            {options.map((option, index) => (
              <OptionCard key={index} option={option} />
            ))}
          </div>
          <div className={styles.cta__button}>
            {page === "main_page_advertiser" ? (
              <SeeCatalog />
            ) : (
              <AddPlatform
                path={`${paths.addPlatform}?add_channel=${addChannelQueries.main}`}
              />
            )}
          </div>
        </div>
        <div>
          <img src={`/images/assets/${t(`${page}.main_img`)}`} alt="" />
        </div>
      </div>
    </Element>
  );
};
