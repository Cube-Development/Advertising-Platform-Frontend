import { Skeleton } from "@shared/ui";
import { FC } from "react";
import styles from "./styles.module.scss";

export const SkeletonAdminTransactionCard: FC = () => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[0px]">
      <div className={styles.wrapper}>
        {Array.from({ length: 7 }).map((_, index) => (
          <div className={styles.column} key={index}>
            <Skeleton className="h-3 w-full" />
          </div>
        ))}
        <Skeleton className="h-full w-full rounded-[10px]" />
        <div className={styles.buttons}>
          <Skeleton className="h-full w-[30px] rounded-[10px]" />
          <Skeleton className="h-full w-[30px] rounded-[10px]" />
        </div>
      </div>
    </Skeleton>
  );
};
