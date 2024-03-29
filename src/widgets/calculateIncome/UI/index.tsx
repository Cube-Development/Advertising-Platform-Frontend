import { AddPlatform } from "@features/addPlatform";
import { WorkWithUs } from "@features/workWithUs";
import { CalculatorIcon } from "@shared/assets";
import { IncomeCalculator } from "@shared/ui/incomeCalculator";
import { SliderSubs } from "@shared/ui/sliderSubs";
import { ThemeChanger } from "@shared/ui/themeChanger";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface CalculateIncomeProps {
  page: string;
}

export const CalculateIncome: FC<CalculateIncomeProps> = ({ page }) => {
  const { t } = useTranslation();

  const [userCount, setUserCount] = useState<number>(1000);
  const [themeCoefficient, setThemeCoefficient] = useState<number>(1);
  const calculatedIncome = userCount * themeCoefficient;
  const handleThemeChange = (coefficient: number) => {
    setThemeCoefficient(coefficient);
  };

  return (
    <section id="calculateIncome" className={styles.calculate__wrapper}>
      <div className="container">
        <div className={styles.calculate__row}>
          <CalculatorIcon />
          <h1 className={styles.calculate__title}>
            {t(`${page}.calculate_title`)}
          </h1>
        </div>

        <h2 className={styles.calculate__subtitle}>
          {t(`${page}.calculate_subtitle`)}
        </h2>
        <p className={styles.calculate__text}>{t(`${page}.calculate_text`)}</p>
        <div className={styles.card__wrapper}>
          <div className={styles.card}>
            <h1 className={styles.card__title}>{t(`${page}.card.title`)}</h1>
            <div className={styles.card__content}>
              <ThemeChanger page={page} onThemeChange={handleThemeChange} />
              <IncomeCalculator
                page={page}
                calculatedIncome={calculatedIncome}
              />
              <SliderSubs onUserCountChange={setUserCount} />
              <AddPlatform props={{ className: styles.button }} />
            </div>
          </div>
        </div>
        <WorkWithUs page={page} />
      </div>
    </section>
  );
};
