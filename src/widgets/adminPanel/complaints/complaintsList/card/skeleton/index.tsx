import { Skeleton } from "@shared/ui";
import { FC } from "react";
import styles from "./styles.module.scss";

export const SkeletonAdminComplaintCard: FC = () => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[0px]">
      <div className={styles.wrapper}>
        <div className={styles.column}>
          <Skeleton className="h-2.5 w-full" />
        </div>
        <div className={styles.column}>
          <Skeleton className="h-2.5 w-4/5" />
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
        <div className={styles.column}>
          <Skeleton className="h-2.5 w-3/5" />
        </div>
        <div className={styles.last}>
          <Skeleton className="h-full w-full rounded-[10px]" />
          <div>
            <Skeleton className="w-[58px] h-[40px]  rounded-[10px]" />
          </div>
        </div>
      </div>
    </Skeleton>
  );
};
