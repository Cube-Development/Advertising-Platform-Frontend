import { CustomerList } from "@features/customerList";
import { MAIN_PAGE_ANIMATION } from "@shared/config/animation";
import { motion } from "framer-motion";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface CustomersProps {
  page: string;
}

export const Customers: FC<CustomersProps> = ({ page }) => {
  const { t } = useTranslation();
  let custom = 0;
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={MAIN_PAGE_ANIMATION.viewport}
      className={`${styles.customer}`}
    >
      <motion.div
        custom={custom++}
        variants={MAIN_PAGE_ANIMATION.animationUp}
        className={styles.customer__title}
      >
        <p>{t(`${page}.customers_title`)}</p>
      </motion.div>
      <motion.div
        custom={custom++}
        variants={MAIN_PAGE_ANIMATION.animationVision}
        style={{ overflow: "hidden" }}
      >
        <CustomerList
          customers={t(`${page}.customers_list`, { returnObjects: true })}
        />
      </motion.div>
    </motion.section>
  );
};
