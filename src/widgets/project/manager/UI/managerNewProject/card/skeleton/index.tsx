import { FC } from "react";
import styles from "./styles.module.scss";
import { Skeleton } from "@shared/ui";

export const SkeletonManagerNewProjectCard: FC = () => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[20px]">
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.card__name}>
            <Skeleton className="h-4 w-1/2" />
            <div>
              <Skeleton className="h-2 w-1/2" />
              <Skeleton className="h-2 w-full" />
            </div>
          </div>
          <div className={styles.card__info}>
            <div className={styles.info}>
              <Skeleton className="h-3 w-4/5" />
              <div className={styles.info_mini}>
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
            <div className={styles.info}>
              <Skeleton className="h-3 w-4/5" />
              <div className={styles.info_mini}>
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          </div>
          <div className={styles.card__buttons}>
            <Skeleton className="h-full w-full rounded-[15px]" />
            <Skeleton className="h-full w-full rounded-[15px]" />
          </div>
        </div>
      </div>
    </Skeleton>
  );
};
