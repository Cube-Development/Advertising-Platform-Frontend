import { Skeleton } from "@shared/ui";
import { FC } from "react";
import styles from "./styles.module.scss";

export const SkeletonChannelAddToCart: FC = () => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[20px]">
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <Skeleton className="h-5 w-full" />
        </div>
        <div className={styles.format}>
          <Skeleton className="h-3.5 w-3/5 mx-auto" />
          <Skeleton className="h-[34px] w-full rounded-[10px]" />
        </div>
        <div className={styles.price}>
          <Skeleton className="h-3.5 w-3/5 mx-auto" />
          <Skeleton className="h-7 w-2/5 mx-auto" />
        </div>
        <Skeleton className="h-[40px] w-full rounded-[12px]" />
      </div>
    </Skeleton>
  );
};
