import { Skeleton } from "@shared/ui";
import { FC } from "react";
import styles from "./styles.module.scss";

export const SkeletonChannelDescription: FC = () => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[20px]">
      <div className={styles.wrapper}>
        <div className={styles.channel__logo__wrapper}>
          <div className={styles.channel__logo}>
            <div className={styles.logo}>
              <Skeleton className="h-[100px] w-[100px] rounded-full" />
              <div className={styles.rating}>
                <Skeleton className="h-[20px] w-[20px] rounded-full" />
                <Skeleton className="h-[20px] w-[20px] rounded-full" />
                <Skeleton className="h-[20px] w-[20px] rounded-full" />
                <Skeleton className="h-[20px] w-[20px] rounded-full" />
                <Skeleton className="h-[20px] w-[20px] rounded-full" />
              </div>
            </div>
            <Skeleton className="h-[40px] w-[145px] rounded-[12px]" />
          </div>
        </div>
        <div>
          <div className={styles.channel__description}>
            <div className={styles.title}>
              <Skeleton className="h-10 w-[180px]" />
            </div>
            <div className={styles.icons}>
              <Skeleton className="h-[25px] w-[25px] rounded-full" />
              <Skeleton className="h-[25px] w-[25px] rounded-full" />
              <Skeleton className="h-[25px] w-[25px] rounded-full" />
            </div>
            <div className={styles.description}>
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-[280px]" />
            </div>
            <div className={styles.link}>
              <Skeleton className="h-[25px] w-[25px] rounded-full" />
              <Skeleton className="h-3 w-[180px]" />
            </div>
          </div>
        </div>
      </div>
    </Skeleton>
  );
};
