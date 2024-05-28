import { AddPlatform } from "@features/addPlatform";
import { WorkWithUs } from "@features/workWithUs";
import { CalculatorIcon } from "@shared/assets";
import { IncomeCalculator } from "@shared/ui/incomeCalculator";
import { SliderSubs } from "@shared/ui/sliderSubs";
import { ThemeChanger } from "@shared/ui/themeChanger";
import { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { paths } from "@shared/routing";
import { addChannelQueries } from "@shared/config/addChannelQueries";

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

  const calculateIncomeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.location.hash === "#calculateIncome") {
      calculateIncomeRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <section
      id="calculateIncome"
      ref={calculateIncomeRef}
      className={styles.calculate__wrapper}
    >
      <div className={styles.top}>
        <div className={styles.title}>
          <div>
            <CalculatorIcon />
          </div>
          <p>{t(`${page}.calculate.title`)}</p>
        </div>
        <div className={styles.subtitle}>
          <p>{t(`${page}.calculate.subtitle`)}</p>
        </div>
      </div>
      <div className={styles.card__wrapper}>
        <div className={styles.card}>
          <div className={styles.card__top}>
            <p className={styles.card__title}>{t(`${page}.card.title`)}</p>
            <p className={styles.card__subtitle}>
              {t(`${page}.calculate.text`)}
            </p>
          </div>
          <div className={styles.card__content}>
            <ThemeChanger page={page} onThemeChange={handleThemeChange} />
            <IncomeCalculator page={page} calculatedIncome={calculatedIncome} />
            <SliderSubs onUserCountChange={setUserCount} />
            <AddPlatform
              path={`${paths.addPlatform}?add_channel=${addChannelQueries.main}`}
              props={{ className: styles.button }}
            />
          </div>
        </div>
      </div>
      <WorkWithUs page={page} />
    </section>
  );
};
