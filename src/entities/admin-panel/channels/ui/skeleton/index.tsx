import { Skeleton } from "@shared/ui";
import { FC } from "react";
import styles from "./styles.module.scss";

export const SkeletonAdminChannelCard: FC = () => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[0px]">
      <div className={styles.wrapper}>
        <div className={styles.channel}>
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
        <div className={styles.column}>
          <Skeleton className="h-2.5 w-3/5" />
        </div>
        <div className={styles.column}>
          <Skeleton className="h-2.5 w-3/5" />
        </div>
        <Skeleton className="h-full w-full rounded-[10px]" />
        <div className={styles.buttons}>
          <Skeleton className="h-full w-[30px] rounded-[10px]" />
          <Skeleton className="h-full w-[30px] rounded-[10px]" />
        </div>
      </div>
    </Skeleton>
  );
};
