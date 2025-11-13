import { ENUM_AGENCY_PROJECT_STATUS } from "@entities/project";
import { Skeleton } from "@shared/ui";
import { FC } from "react";
import styles from "./styles.module.scss";

interface SkeletonManagerProjectCardProps {
  statusFilter: ENUM_AGENCY_PROJECT_STATUS;
}

export const SkeletonManagerProjectCard: FC<
  SkeletonManagerProjectCardProps
> = ({ statusFilter }) => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[20px]">
      <div className={`${styles.wrapper} `}>
        <div
          className={`${styles.card} ${
            statusFilter === ENUM_AGENCY_PROJECT_STATUS.COMPLETED
              ? styles.card__manager_completed
              : ""
          } `}
        >
          <div className={styles.card__description}>
            <div className={styles.card__description__data}>
              <div className={styles.card__description__data__title}>
                <Skeleton className="h-3 w-[80px]" />
                <Skeleton className="h-2 w-[100px]" />
              </div>
              <div className={styles.card__description__data__date}>
                <Skeleton className="h-2 w-[100px]" />
                <Skeleton className="h-2 w-[100px]" />
              </div>
            </div>
            <Skeleton className="w-full h-full rounded-[10px]" />
          </div>
          {
            <div className={`${styles.chat__btn} display__hide__min__md`}>
              <Skeleton className="h-full w-full rounded-[10px]" />
            </div>
          }

          <div className={styles.card__info}>
            <div className={styles.card__info__data}>
              <Skeleton className="h-full w-full rounded-[10px]" />
              <Skeleton className="h-full w-full rounded-[10px]" />
              <Skeleton className="h-full w-full rounded-[10px]" />
              {statusFilter === ENUM_AGENCY_PROJECT_STATUS.COMPLETED && (
                <Skeleton className="h-full w-full rounded-[10px] min-w-[190px]" />
              )}
            </div>

            {statusFilter === ENUM_AGENCY_PROJECT_STATUS.REQUEST_APPROVE ? (
              <div className={styles.card__info__icons_manager_request_approve}>
                <div>
                  <Skeleton className="h-3 w-5/6 max-w-[250px]" />
                </div>
                <Skeleton className="w-full h-full rounded-[15px] min-h-11" />
              </div>
            ) : statusFilter === ENUM_AGENCY_PROJECT_STATUS.COMPLETED ? (
              <div className={styles.card__info__icons_manager_completed}>
                <div className={styles.top}>
                  <Skeleton className={`w-full h-full rounded-[10px]`} />
                  <Skeleton className={`w-full h-full rounded-[10px]`} />
                </div>
                <div className={styles.bottom}>
                  <Skeleton className={`w-full h-full rounded-[10px]`} />
                </div>
              </div>
            ) : (
              <div className={styles.card__info__icons}>
                <Skeleton
                  className={`w-full h-full rounded-[10px] ${styles.item__full}`}
                />
                <Skeleton
                  className={`w-full h-full rounded-[10px] ${styles.item__left}`}
                />
                <Skeleton
                  className={`w-full h-full rounded-[10px] ${styles.item__right}`}
                />
                <Skeleton
                  className={`w-full h-full rounded-[10px] ${styles.item__left}`}
                />
                <Skeleton
                  className={`w-full h-full rounded-[10px] ${styles.item__right}`}
                />
              </div>
            )}
          </div>
        </div>
        <Skeleton className="w-full h-full rounded-bl-[20px] rounded-br-[20px]" />
      </div>
    </Skeleton>
  );
};
