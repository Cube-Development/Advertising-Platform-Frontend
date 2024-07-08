import { Skeleton } from "@shared/ui/shadcn-ui/ui/skeleton";
import { FC } from "react";
import styles from "./styles.module.scss";

export const ModChannelCardSkeleton: FC = () => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[12px]">
      <div className={styles.card}>
        <div className={styles.card__logo}>
          <Skeleton className="h-[50px] w-[50px] rounded-full" />
          <div className={styles.title}>
            <Skeleton className="h-3 w-[70px]" />
            <Skeleton className="h-2 w-[100px]" />
          </div>
        </div>
        <div className={styles.card__info}>
          <Skeleton className="h-3 w-full" />
        </div>
        <div className={styles.card__info}>
          <Skeleton className="h-full w-full rounded-[12px]" />
        </div>
        <div className={styles.card__status}>
          <Skeleton className="h-3 w-full" />
        </div>
      </div>
    </Skeleton>
  );
};
