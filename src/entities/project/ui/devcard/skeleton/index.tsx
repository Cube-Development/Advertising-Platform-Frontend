import { Skeleton } from "@shared/ui";
import { FC } from "react";
import styles from "./styles.module.scss";

export const SkeletonAdvDevProjectCard: FC = () => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[20px]">
      <div className={styles.card}>
        <div className={styles.card__title}>
          <Skeleton className="h-4 w-4/5 max-w-48" />
          <div className={styles.date}>
            <Skeleton className="h-2 w-3/5 max-w-24" />
            <Skeleton className="h-2 w-full max-w-24 min-w-20" />
          </div>
        </div>
        <div className={styles.card__info}>
          <div>
            <Skeleton className="h-full w-full rounded-[10px]" />
          </div>
          <div>
            <Skeleton className="h-full w-full rounded-[10px]" />
          </div>
        </div>
        <div className={styles.card__status}>
          <Skeleton className="h-full w-full rounded-[12px]" />
        </div>
        <div className={styles.card__chat}>
          <Skeleton className="h-full w-full rounded-[12px]" />
        </div>
      </div>
    </Skeleton>
  );
};
