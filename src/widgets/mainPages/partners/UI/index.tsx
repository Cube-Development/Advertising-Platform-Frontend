import { motion } from "framer-motion";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { PAGE_ANIMATION } from "@shared/config/animation";
import { PartnerList } from "@features/other";

interface PartnersProps {
  page: string;
}

export const Partners: FC<PartnersProps> = ({ page }) => {
  const { t } = useTranslation();
  let custom = 0;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={PAGE_ANIMATION.viewport}
      className={styles.partners}
    >
      {/* <motion.h1
        custom={custom++}
        variants={PAGE_ANIMATION.animationUp}
        className={styles.partners__title}
      >
        {t(`${page}.partners_title`)}
      </motion.h1>
      <div className={styles.partners__block}>
        <motion.div custom={custom++} variants={PAGE_ANIMATION.animationVision}>
          <PartnerList
            partners={
              t(`${page}.partners_list`, { returnObjects: true }) as {
                img: string;
              }[]
            }
          />
        </motion.div>
        <motion.div
          custom={custom++}
          variants={PAGE_ANIMATION.animationVision}
          className={styles.bottom}
        >
          <PartnerList
            partners={
              t(`${page}.partners_list`, { returnObjects: true }) as {
                img: string;
              }[]
            }
            isLeft={true}
          />
        </motion.div>
      </div> */}
    </motion.section>
  );
};
