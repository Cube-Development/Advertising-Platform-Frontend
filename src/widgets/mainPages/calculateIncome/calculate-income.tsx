import { WorkWithUs } from "@features/mainPages";
import { CalculatorIcon } from "@shared/assets";
import { PAGE_ANIMATION } from "@shared/config/animation";
import { motion } from "framer-motion";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./calculate-income.module.scss";
import { ProfitCalculator } from "./UI/profit-calculator";

interface CalculateIncomeProps {
  page: string;
}

export const CalculateIncome: FC<CalculateIncomeProps> = ({ page }) => {
  const { t } = useTranslation();
  const calculateIncomeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash === "#calculateIncome") {
      calculateIncomeRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, []);
  let custom = 0;
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={PAGE_ANIMATION.viewport}
      variants={PAGE_ANIMATION.animationVision}
      custom={custom++}
      id="calculateIncome"
      ref={calculateIncomeRef}
      className={styles.calculate__wrapper}
    >
      <div className={styles.top}>
        <motion.div
          custom={custom++}
          variants={PAGE_ANIMATION.animationUp}
          className={styles.title}
        >
          <div>
            <CalculatorIcon />
          </div>
          <p>{t(`${page}.calculate.title`)}</p>
        </motion.div>
        <motion.div
          custom={custom++}
          variants={PAGE_ANIMATION.animationUp}
          className={styles.subtitle}
        >
          <p>{t(`${page}.calculate.subtitle`)}</p>
        </motion.div>
      </div>
      <motion.div
        custom={custom++}
        variants={PAGE_ANIMATION.animationVision}
        className={styles.card__wrapper}
      >
        <div className={styles.card}>
          <div className={styles.card__top}>
            <p className={styles.card__title}>{t(`${page}.card.title`)}</p>
            <p className={styles.card__subtitle}>
              {t(`${page}.calculate.text`)}
            </p>
          </div>
          <ProfitCalculator />
        </div>
      </motion.div>
      <WorkWithUs page={page} />
    </motion.section>
  );
};
