import { Skeleton } from "@shared/ui";
import { FC } from "react";
import styles from "./styles.module.scss";

export const OfferCardSkeleton: FC = () => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[12px]">
      <div className={styles.card}>
        <div className={styles.card__title}>
          <div className={styles.card__title__top}>
            <Skeleton className="h-[30px] w-[30px] rounded-full" />
            <div className={styles.title}>
              <Skeleton className="h-3 w-[70px]" />
              <Skeleton className="h-2 w-[50px]" />
            </div>
            <div className={styles.date}>
              <Skeleton className="h-2 w-[50px]" />
              <Skeleton className="h-2 w-[50px]" />
            </div>
          </div>
          <div className={styles.card__title__bottom}>
            <Skeleton className="h-[80px] w-[200px]" />
            <Skeleton className="h-5 w-[100px]" />
          </div>
        </div>
        <div className={styles.card__info}>
          <div className={styles.card__info__data}>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
          <div className={styles.card__info__data}>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
        <div className={styles.card__info}>
          <div className={styles.card__info__data}>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
          <div className={styles.card__info__data}>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
        <div className={styles.card__status}>
          <Skeleton className="h-full w-full rounded-[12px]" />
        </div>
      </div>
    </Skeleton>
  );
};
