import { ENUM_OFFER_STATUS } from "@entities/offer";
import { Skeleton } from "@shared/ui";
import { FC } from "react";
import styles from "./styles.module.scss";

interface OfferCardSkeletonProps {
  statusFilter: ENUM_OFFER_STATUS;
}

export const OfferCardSkeleton: FC<OfferCardSkeletonProps> = ({
  statusFilter,
}) => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[20px]">
      <div
        className={`${styles.card} ${statusFilter === ENUM_OFFER_STATUS.ACTIVE ? styles.active__chat : ""} border__gradient`}
      >
        <div className={styles.card__description}>
          <div className={styles.card__description__data}>
            <div className={styles.description}>
              <Skeleton className="h-[50px] w-[50px] rounded-full" />
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
        {statusFilter === ENUM_OFFER_STATUS.ACTIVE && (
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
          {statusFilter === ENUM_OFFER_STATUS.ACTIVE ? (
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
          ) : statusFilter === ENUM_OFFER_STATUS.WAIT ? (
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
          ) : statusFilter === ENUM_OFFER_STATUS.COMPLETED ? (
            <div className={styles.card__complete}>
              <Skeleton className="h-[90px] w-[90px] rounded-[15px]" />
              <Skeleton className="h-3 w-[150px] rounded-[15px]" />
            </div>
          ) : statusFilter === ENUM_OFFER_STATUS.CANCELED ? (
            <div className={styles.card__cancel}>
              <div className={styles.card__cancel__title}>
                <Skeleton className="h-3 w-full" />
              </div>
              <div>
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-2 w-full" />
              </div>
            </div>
          ) : statusFilter === ENUM_OFFER_STATUS.MODERATION ? (
            <div className={styles.card__moderation}>
              <div>
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-2 w-full" />
              </div>
            </div>
          ) : statusFilter === ENUM_OFFER_STATUS.UNFULFILLED ? (
            <div className={styles.card__uncomplete}>
              <div className={styles.card__uncomplete__title}>
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
