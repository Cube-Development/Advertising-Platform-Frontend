import { PAGE_ANIMATION } from "@shared/config/animation";
import { IBasicInfo } from "@shared/types/translate";
import { motion } from "framer-motion";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { ServiceCard } from "../serviceCard";

interface ServicesProps {
  page: string;
}

export const Services: FC<ServicesProps> = ({ page }) => {
  const { t } = useTranslation();
  const infos = t(`${page}.services_list`, {
    returnObjects: true,
  }) as IBasicInfo[];
  let custom = 7;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={PAGE_ANIMATION.viewport}
      className={`${styles.wrapper} container`}
    >
      <motion.h2
        custom={custom++}
        variants={PAGE_ANIMATION.animationUp}
        className={styles.title}
      >
        {t(`${page}.services_title`)}
      </motion.h2>
      <div className={styles.infos}>
        {infos.map((info, index) => (
          <ServiceCard key={index} info={info} custom={custom++} />
        ))}
      </div>
    </motion.section>
  );
};
