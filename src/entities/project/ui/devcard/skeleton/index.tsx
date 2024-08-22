import { FC } from "react";
import styles from "./styles.module.scss";
import { Skeleton } from "@shared/ui";

interface SkeletonAdvDevProjectCardProps {}

export const SkeletonAdvDevProjectCard: FC<
  SkeletonAdvDevProjectCardProps
> = () => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[20px]">
      <div className={styles.card}>
        <div className={styles.card__title}>
          <Skeleton className="h-3 w-[150px]" />
          <Skeleton className="h-2 w-[100px]" />
        </div>
        <div className={styles.card__info}>
          <Skeleton className="h-3 w-full" />
        </div>
        <div className={styles.card__info}>
          <Skeleton className="h-3 w-full" />
        </div>
        <div className={styles.card__status}>
          <Skeleton className="h-full w-full rounded-[12px]" />
        </div>
      </div>
    </Skeleton>
  );
};
