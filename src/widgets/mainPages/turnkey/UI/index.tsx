import { PriceList } from "@features/other";
import { KeyIcon } from "@shared/assets";
import { MAIN_PAGE_ANIMATION } from "@shared/config/animation";
import { motion } from "framer-motion";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface TurnkeyProps {
  page: string;
}

export const Turnkey: FC<TurnkeyProps> = ({ page }) => {
  const { t } = useTranslation();
  let custom = 0;
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={MAIN_PAGE_ANIMATION.viewport}
      variants={MAIN_PAGE_ANIMATION.animationVision}
      custom={custom++}
      className={styles.wrapper}
    >
      <div className={styles.top}>
        <motion.div
          custom={custom++}
          variants={MAIN_PAGE_ANIMATION.animationUp}
          className={styles.title}
        >
          <div>
            <KeyIcon />
          </div>
          <p>{t(`${page}.turnkey_title`)}</p>
        </motion.div>
        <motion.div
          custom={custom++}
          variants={MAIN_PAGE_ANIMATION.animationUp}
          className={styles.subtitle}
        >
          <p>{t(`${page}.turnkey_subtitle`)}</p>
        </motion.div>
        <motion.p
          custom={custom++}
          variants={MAIN_PAGE_ANIMATION.animationUp}
          className={styles.text}
        >
          {t(`${page}.turnkey_text`)}
        </motion.p>
      </div>

      {/* <motion.div
        custom={custom++}
        variants={MAIN_PAGE_ANIMATION.animationVision}
      > */}
      <PriceList tarifs={t(`${page}.tarifs_list`, { returnObjects: true })} />
      {/* </motion.div> */}
    </motion.section>
  );
};
