import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface IncomeCalculatorProps {
  page: string;
  calculatedIncome: number;
}

export const IncomeCalculator: FC<IncomeCalculatorProps> = ({
  page,
  calculatedIncome,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.income__wrapper}>
      <h2 className={styles.income__title}>{t(`${page}.card.income`)}</h2>
      <h2 className={styles.income__cash}>
        {calculatedIncome.toLocaleString()} {t(`symbol`)}
      </h2>
    </div>
  );
};
