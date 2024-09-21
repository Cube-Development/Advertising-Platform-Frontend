import { Skeleton } from "@shared/ui";
import { FC } from "react";
import styles from "./styles.module.scss";

export const ModChannelCardSkeleton: FC = () => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[12px]">
      <div className={styles.card}>
        <div className={styles.card__logo}>
          <Skeleton className="h-[50px] w-[50px] rounded-full" />
          <div className={styles.title}>
            <Skeleton className="h-3 w-3/5 max-w-[200px]" />
            <Skeleton className="h-2 w-2/5 max-w-[160px]" />
          </div>
        </div>
        <div className={styles.card__info}>
          <Skeleton className="h-3 w-full min-w-[120px]" />
        </div>
        <div className={styles.card__status}>
          <Skeleton className="h-full w-full rounded-[12px]" />
        </div>
        <div className={styles.card__text}>
          <Skeleton className="h-3 w-full" />
        </div>
      </div>
    </Skeleton>
  );
};
