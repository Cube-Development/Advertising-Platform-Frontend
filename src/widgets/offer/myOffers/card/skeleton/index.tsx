import { offerStatusFilter } from "@entities/offer";
import { Skeleton } from "@shared/ui";
import { FC } from "react";
import styles from "./styles.module.scss";

interface OfferCardSkeletonProps {
  statusFilter: offerStatusFilter;
}

export const OfferCardSkeleton: FC<OfferCardSkeletonProps> = ({
  statusFilter,
}) => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[20px]">
      <div
        className={`${styles.card} ${statusFilter === offerStatusFilter.active ? styles.active__chat : ""} border__gradient`}
      >
        <div className={styles.card__description}>
          <div className={styles.card__description__data}>
            <div className={styles.description}>
              <Skeleton className="h-[30px] w-[30px] rounded-full" />
              <div>
                <Skeleton className="h-4 w-[90px]" />
                <Skeleton className="h-2 w-[90px]" />
              </div>
            </div>
            <div className={styles.date}>
              <Skeleton className="h-2 w-[70px]" />
              <Skeleton className="h-2 w-[70px]" />
            </div>
          </div>
          <Skeleton className="h-full w-full rounded-[12px]" />
        </div>
        {statusFilter === offerStatusFilter.active && (
          <div className={`${styles.chat__btn} display__hide__min__md`}>
            <Skeleton className="h-full w-full rounded-[12px]" />
          </div>
        )}
        <div className={styles.card__info}>
          <Skeleton className="h-full w-full rounded-[15px]" />
          <Skeleton className="h-full w-full rounded-[15px]" />
          <Skeleton className="h-full w-full rounded-[15px]" />
          <Skeleton className="h-full w-full rounded-[15px]" />
        </div>
        <>
          {statusFilter === offerStatusFilter.active ? (
            <div className={styles.card__active}>
              <div className={styles.card__active__title}>
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-2 w-full" />
              </div>
              <div className={styles.card__active__buttons}>
                <Skeleton className="min-h-[35px] w-full rounded-[12px]" />
                <Skeleton className="min-h-[35px] w-full rounded-[12px]" />
              </div>
            </div>
          ) : statusFilter === offerStatusFilter.wait ? (
            <div className={styles.card__wait}>
              <div className={styles.card__wait__title}>
                <Skeleton className="h-3 w-full" />
              </div>
              <div className={styles.card__wait__buttons}>
                <Skeleton className="h-full w-full rounded-[12px] min-h-[40px]" />
                <Skeleton className="h-full w-full rounded-[12px]" />
                <Skeleton className="h-full w-full rounded-[12px]" />
              </div>
            </div>
          ) : statusFilter === offerStatusFilter.completed ? (
            <div className={styles.card__complite}>
              <Skeleton className="h-[90px] w-[90px] rounded-[15px]" />
              <Skeleton className="h-3 w-[150px] rounded-[15px]" />
            </div>
          ) : statusFilter === offerStatusFilter.canceled ? (
            <div className={styles.card__cancel}>
              <div className={styles.card__cancel__title}>
                <Skeleton className="h-3 w-full" />
              </div>
              <div>
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-2 w-full" />
              </div>
            </div>
          ) : statusFilter === offerStatusFilter.moderation ? (
            <div className={styles.card__moderation}>
              <div>
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-2 w-full" />
              </div>
            </div>
          ) : statusFilter === offerStatusFilter.unfulfilled ? (
            <div className={styles.card__uncomplite}>
              <div className={styles.card__uncomplite__title}>
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-2 w-full" />
              </div>
              <div>
                <Skeleton className="min-h-[35px] w-full rounded-[12px]" />
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      </div>
    </Skeleton>
  );
};
