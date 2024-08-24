import { Skeleton } from "@shared/ui";
import { FC } from "react";
import styles from "./styles.module.scss";

export const SkeletonChannelParameters: FC = () => {
  return (
    <div className={styles.wrapper}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="bg-skeleton-light rounded-[20px]">
          <div className={styles.parameters__row}>
            <Skeleton className="h-3.5 w-4/5" />
            <Skeleton className="h-3.5 w-4/5" />
          </div>
        </Skeleton>
      ))}
    </div>
  );
};
