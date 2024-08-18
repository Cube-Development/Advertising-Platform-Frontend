import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { IChannelStatistics } from "@entities/channel/types";

interface StatisticsProps {
  statistics: IChannelStatistics;
}
const changeNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2).replace(/\.00$/, "") + "kk";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(2).replace(/\.00$/, "") + "k";
  } else {
    return num.toString();
  }
};

export const Statistics: FC<StatisticsProps> = ({ statistics }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t("channel.statistics.title")}</p>
      <div className={styles.block__wrapper}>
        <div className={styles.main}>
          <div className={styles.block}>
            <p>{t("channel.statistics.orders")}</p>
            <span>{changeNumber(statistics.orders)}</span>
          </div>
          <div className={styles.block}>
            <p>{t("channel.statistics.subs")}</p>
            <span>{changeNumber(statistics.subs)}</span>
          </div>
        </div>
        <div className={styles.channel}>
          <div className={`${styles.column} ${styles.borRight}`}>
            <div className={`${styles.row} ${styles.borBottom}`}>
              <div className={styles.center}>
                <p>{t("channel.statistics.views")}:</p>
                <span>{changeNumber(statistics.views)}</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.center}>
                <p>{t("channel.statistics.er")}:</p>
                <span>{statistics.er} %</span>
              </div>
            </div>
          </div>
          <div className={styles.column}>
            <div className={`${styles.row} ${styles.borBottom}`}>
              <div className={styles.center}>
                <p>{t("channel.statistics.posts")}:</p>
                <span>{statistics.posts}</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.center}>
                <p>{t("channel.statistics.cpv")}:</p>
                <span>
                  {statistics.cpv} {t("symbol")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
