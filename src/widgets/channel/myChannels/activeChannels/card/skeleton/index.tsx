import { Skeleton } from "@shared/ui/shadcn-ui/ui/skeleton";
import { FC } from "react";
import styles from "./styles.module.scss";

export const ChannelCardSkeleton: FC = () => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[12px]">
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.card__logo}>
            <div className={styles.logo}>
              <Skeleton className="h-[80px] w-[80px] rounded-full" />
              <div className={styles.rate}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-[10px] w-[10px] rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.card__description}>
            <div className={styles.card__description__data}>
              <div className={styles.card__description__data__title}>
                <Skeleton className="h-3 w-[150px]" />
                <Skeleton className="h-2 w-[100px]" />
              </div>
              <div className={styles.card__description__data__params}>
                <Skeleton className="h-[30px] w-[30px] rounded-full" />
                <Skeleton className="h-[30px] w-[30px] rounded-full" />
              </div>
            </div>
            <Skeleton className="w-full h-full rounded-[12px]" />
          </div>
          <div className={styles.card__info}>
            <div className={styles.card__info__data}>
              <div></div>
              <Skeleton className="h-[50px] w-[340px]" />
            </div>
            <div className={styles.card__info__icons}>
              <Skeleton className="w-full h-full rounded-[8px]" />
              <Skeleton className="w-full h-full rounded-[8px]" />
              <Skeleton className="w-full h-full rounded-[8px]" />
              <Skeleton className="w-full h-full rounded-[8px]" />
            </div>
          </div>
        </div>
        <Skeleton className="w-full h-full rounded-[12px]" />
      </div>
    </Skeleton>
  );
};
