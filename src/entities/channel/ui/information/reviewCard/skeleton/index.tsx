import { Skeleton } from "@shared/ui";
import { FC } from "react";
import styles from "./styles.module.scss";

export const SkeletonReviewCard: FC = () => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[12px]">
      <div className={styles.card}>
        <div className={styles.review}>
          <div className={styles.top}>
            <div className={styles.left}>
              <Skeleton className="h-[40px] w-[40px] rounded-full" />
              <Skeleton className="h-2 w-[150px]" />
            </div>
            <Skeleton className="h-2 w-[80px]" />
          </div>
          <div className={styles.rating}>
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-3 rounded-full" />
          </div>
          <div className={styles.description}>
            <Skeleton className="h-2.5 w-full" />
            <Skeleton className="h-2.5 w-full" />
            <Skeleton className="h-2.5 w-full" />
            <Skeleton className="h-2.5 w-full" />
            <Skeleton className="h-2.5 w-2/5" />
          </div>
        </div>
      </div>
    </Skeleton>
  );
};
