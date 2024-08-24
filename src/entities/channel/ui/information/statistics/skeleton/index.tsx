import { Skeleton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const SkeletonChannelStatistics: FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{t("channel.statistics.title")}</p>
      {/* <Skeleton className="h-10 w-2/5" /> */}
      <div className={styles.block__wrapper}>
        <div className={styles.main}>
          <Skeleton className="bg-skeleton-light rounded-[12px]">
            <div className={styles.block}>
              <Skeleton className="h-3.5 w-3/5" />
              <Skeleton className="h-7 w-2/5" />
            </div>
          </Skeleton>
          <Skeleton className="bg-skeleton-light rounded-[12px]">
            <div className={styles.block}>
              <Skeleton className="h-3.5 w-3/5" />
              <Skeleton className="h-7 w-2/5" />
            </div>
          </Skeleton>
        </div>
        <Skeleton className="bg-skeleton-light rounded-[12px]">
          <div className={styles.channel}>
            <div className={`${styles.column}`}>
              <div className={`${styles.row}`}>
                <div className={styles.center}>
                  <Skeleton className="h-3.5 w-4/5" />
                  <Skeleton className="h-7 w-3/5" />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.center}>
                  <Skeleton className="h-3.5 w-4/5" />
                  <Skeleton className="h-7 w-3/5" />
                </div>
              </div>
            </div>
            <div className={styles.column}>
              <div className={`${styles.row} `}>
                <div className={styles.center}>
                  <Skeleton className="h-3.5 w-4/5" />
                  <Skeleton className="h-7 w-3/5" />
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.center}>
                  <Skeleton className="h-3.5 w-4/5" />
                  <Skeleton className="h-7 w-3/5" />
                </div>
              </div>
            </div>
          </div>
        </Skeleton>
      </div>
    </div>
  );
};
