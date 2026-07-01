import { ICommonObserveTotals } from "@entities/admin";
import { formatMoney } from "@shared/utils";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  COMMON_OBSERVE_METRIC_KEYS,
  getCommonObserveColumnLabelKey,
} from "../model/constants";
import styles from "./styles.module.scss";

interface CommonObserveTotalsProps {
  totals: ICommonObserveTotals;
}

export const CommonObserveTotalsCards: FC<CommonObserveTotalsProps> = ({
  totals,
}) => {
  const { t } = useTranslation();

  const formatTotalValue = (
    key: (typeof COMMON_OBSERVE_METRIC_KEYS)[number],
    value: number,
  ) => {
    if (key === "turnover") {
      return formatMoney(value);
    }
    return value.toLocaleString();
  };

  return (
    <div className={styles.totals}>
      <h2 className={styles.totalsTitle}>
        {t("admin_panel.common_observe.totals_title")}
      </h2>
      <div className={styles.totalsGrid}>
        {COMMON_OBSERVE_METRIC_KEYS.map((key) => (
          <div key={key} className={styles.totalsCard}>
            <p className={styles.totalsLabel}>
              {t(getCommonObserveColumnLabelKey(key))}
            </p>
            <p className={styles.totalsValue}>
              {formatTotalValue(key, totals[key])}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
