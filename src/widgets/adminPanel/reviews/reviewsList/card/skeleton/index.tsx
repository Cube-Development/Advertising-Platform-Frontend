import { adminReviewTypesFilter } from "@entities/admin";
import { Skeleton } from "@shared/ui";
import { FC } from "react";
import styles from "./styles.module.scss";

interface SkeletonAdminReviewCardProps {
  status: adminReviewTypesFilter;
}

export const SkeletonAdminReviewCard: FC<SkeletonAdminReviewCardProps> = ({
  status,
}) => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[0px]">
      <div
        className={`${styles.wrapper} ${status === adminReviewTypesFilter.accept ? styles.accept : styles.wait}`}
      >
        <div className={styles.id}>
          <Skeleton className="h-3 w-full" />
        </div>
        <div className={styles.platform}>
          <div className={styles.logo}>
            <Skeleton className="h-[32px] w-[32px] rounded-full" />
          </div>
          <div className={styles.info}>
            <Skeleton className="h-2.5 w-3/5" />
            <Skeleton className="h-2.5 w-full" />
          </div>
        </div>
        <div className={styles.user}>
          <div className={styles.logo}>
            <Skeleton className="h-[32px] w-[32px] rounded-full" />
          </div>
          <div className={styles.info}>
            <Skeleton className="h-2.5 w-3/5" />
            <Skeleton className="h-2.5 w-full" />
          </div>
        </div>
        {status === adminReviewTypesFilter.accept && (
          <div className={styles.user}>
            <div className={styles.logo}>
              <Skeleton className="h-[32px] w-[32px] rounded-full" />
            </div>
            <div className={styles.info}>
              <Skeleton className="h-2.5 w-3/5" />
              <Skeleton className="h-2.5 w-full" />
            </div>
          </div>
        )}
        <div className={styles.date}>
          <Skeleton className="h-3 w-4/5" />
        </div>
        {status === adminReviewTypesFilter.accept && (
          <div className={styles.date}>
            <Skeleton className="h-3 w-4/5" />
          </div>
        )}
        <div className={styles.last}>
          <Skeleton className="w-[60px] h-[40px]  rounded-[10px]" />
        </div>
      </div>
    </Skeleton>
  );
};
