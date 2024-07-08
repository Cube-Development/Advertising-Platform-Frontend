import { OptionCard } from "src/entities old/optionCard";
import { AddPlatform } from "src/features old/addPlatform";
import { SeeCatalog } from "src/features old/seeCatalog";
import { addChannelQueries } from "@shared/config/addChannelQueries";
import { paths } from "@shared/routing";
import { IOption } from "@shared/types/translate";
import { motion } from "framer-motion";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Element } from "react-scroll";
import styles from "./styles.module.scss";
import { MAIN_PAGE_ANIMATION } from "@shared/config/animation";

interface CtaProps {
  page: string;
}

export const Cta: FC<CtaProps> = ({ page }) => {
  const { t } = useTranslation();
  const options: IOption[] = t(`${page}.cta_list`, { returnObjects: true });
  let custom = 0;

  return (
    <Element name="registration" className="container">
      <motion.div
        id="registration"
        initial="hidden"
        whileInView="visible"
        viewport={MAIN_PAGE_ANIMATION.viewport}
        className={styles.wrapper}
      >
        <div className={styles.cta}>
          <div className={styles.cta__content}>
            <motion.h1
              custom={custom++}
              variants={MAIN_PAGE_ANIMATION.animationLeft}
              className={styles.cta__content__title}
            >
              {t(`${page}.cta_title`)}
            </motion.h1>
            <motion.h2
              custom={custom++}
              variants={MAIN_PAGE_ANIMATION.animationLeft}
              className={styles.cta__content__subtitle}
            >
              {t(`${page}.cta_subtitle`)}
            </motion.h2>
          </div>
          <div className={styles.cta__options}>
            {options.map((option, index) => (
              <OptionCard key={index} option={option} custom={custom++} />
            ))}
          </div>
          <motion.div
            custom={custom++}
            variants={MAIN_PAGE_ANIMATION.animationLeft}
            className={styles.cta__button}
          >
            {page === "main_page_advertiser" ? (
              <SeeCatalog />
            ) : (
              <AddPlatform
                path={`${paths.addChannel}?add_channel=${addChannelQueries.main}`}
              />
            )}
          </motion.div>
        </div>
        <div className={styles.wrapper__image}>
          <img src={`/images/assets/${t(`${page}.main_img`)}`} alt="" />
        </div>
      </motion.div>
    </Element>
  );
};
