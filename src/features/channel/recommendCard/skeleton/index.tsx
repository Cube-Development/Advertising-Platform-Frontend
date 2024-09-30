import { Skeleton } from "@shared/ui";
import { FC } from "react";
import styles from "./styles.module.scss";

export const SkeletonRecommendCard: FC = () => {
  return (
    <Skeleton className="bg-skeleton-light h-full rounded-[15px]">
      <div className={styles.card}>
        <div className={styles.channel}>
          <div className={styles.channel__top}>
            <Skeleton className="w-[80px] h-[80px] rounded-full" />
            <div className={styles.column__info}>
              <div className={styles.info}>
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-2.5 w-4/5" />
                <div className={styles.rating}>
                  <Skeleton className="h-[15px] w-[15px] rounded-full" />
                  <Skeleton className="h-[15px] w-[15px] rounded-full" />
                  <Skeleton className="h-[15px] w-[15px] rounded-full" />
                  <Skeleton className="h-[15px] w-[15px] rounded-full" />
                  <Skeleton className="h-[15px] w-[15px] rounded-full" />
                </div>
              </div>
            </div>
            <div className={styles.column__parameters}>
              <Skeleton className="w-[18px] h-[18px] rounded-full" />
              <Skeleton className="w-[18px] h-[18px] rounded-full" />
              <Skeleton className="w-[18px] h-[18px] rounded-full" />
            </div>
          </div>
          <div className={styles.channel__description}>
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-2 w-2/5" />
          </div>
          <div>
            <Skeleton className="h-[35px] w-full rounded-[10px]" />
            <Skeleton className="h-3 w-1/5 my-[10px] mx-auto" />
          </div>
        </div>
        <Skeleton className="h-full w-full rounded-b-[10px] rounded-t-[0px]" />
      </div>
    </Skeleton>
  );
};
