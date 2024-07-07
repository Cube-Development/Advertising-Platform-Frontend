import { Skeleton } from "@shared/ui/shadcn-ui/ui/skeleton";
import { FC } from "react";
import styles from "./styles.module.scss";

export const SkeletonManagerNewProjectCard: FC = () => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[12px]">
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.card__id}>
            <Skeleton className="h-3 w-1/2" />
          </div>
          <div className={styles.card__date}>
            <Skeleton className="h-3 w-1/2" />
          </div>
          <div className={styles.card__tarif}>
            <Skeleton className="h-3 w-3/5" />
          </div>
          <div className={styles.card__price}>
            <Skeleton className="h-3 w-3/5" />
          </div>
          <div className={styles.card__start}>
            <Skeleton className="h-full w-full rounded-[12px]" />
          </div>
          <div></div>
        </div>
        <Skeleton className="w-full h-full rounded-[12px]" />
      </div>
    </Skeleton>
  );
};
