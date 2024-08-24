import { Skeleton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const SkeletonChannelRate: FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      {/* <Skeleton className="h-10 w-1/5" /> */}
      <p className={styles.title}>{t("channel.reviews.title")}</p>
      <Skeleton className="bg-skeleton-light rounded-[20px]">
        <div className={styles.card}>
          <div className={styles.left}>
            <div className={styles.rate__wrapper}>
              <Skeleton className="h-10 w-[75px]" />
              <div className={styles.rate}>
                <div className={styles.rating}>
                  <Skeleton className="h-[15px] w-[15px] rounded-full" />
                  <Skeleton className="h-[15px] w-[15px] rounded-full" />
                  <Skeleton className="h-[15px] w-[15px] rounded-full" />
                  <Skeleton className="h-[15px] w-[15px] rounded-full" />
                  <Skeleton className="h-[15px] w-[15px] rounded-full" />
                </div>
                <Skeleton className="h-3 w-4/5" />
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.row}>
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-2 w-full" />
            </div>
            <div className={styles.row}>
              <Skeleton className="h-2 w-4/5" />
              <Skeleton className="h-2 w-full" />
            </div>
            <div className={styles.row}>
              <Skeleton className="h-2 w-3/5" />
              <Skeleton className="h-2 w-full" />
            </div>
            <div className={styles.row}>
              <Skeleton className="h-2 w-2/5" />
              <Skeleton className="h-2 w-full" />
            </div>
            <div className={styles.row}>
              <Skeleton className="h-2 w-2/5" />
              <Skeleton className="h-2 w-full" />
            </div>
          </div>
        </div>
      </Skeleton>
    </div>
  );
};
