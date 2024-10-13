import { Skeleton } from "@shared/ui";
import { FC } from "react";
import styles from "./styles.module.scss";

export const SkeletonNotificationCard: FC = () => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[10px] h-[70px]">
      <div className={styles.wrapper}>
        <div className={styles.icon}>
          <Skeleton className="h-[25px] w-[25px] rounded-full" />
        </div>
        <div className={styles.text}>
          <Skeleton className="h-3 w-3/5 rounded-full" />
          <Skeleton className="h-2 w-full rounded-full" />
          <Skeleton className="h-2 w-full rounded-full" />
        </div>
        <div className={styles.info}>
          <Skeleton className="h-2 w-[50px] rounded-full" />
          <Skeleton className="h-2 w-[50px] rounded-full" />
        </div>
      </div>
    </Skeleton>
  );
};
