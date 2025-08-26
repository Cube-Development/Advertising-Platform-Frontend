import { ENUM_CHANNEL_STATUS } from "@entities/channel";
import { ENUM_OFFER_STATUS } from "@entities/offer";
import {
  ENUM_ADV_MANAGER_PROJECT_STATUS,
  ENUM_ADV_MY_PROJECT_STATUS,
  ENUM_PROJECT_TYPES,
} from "@entities/project";
import { Skeleton } from "@shared/ui";
import { FC } from "react";
import styles from "./styles.module.scss";

interface ProjectCardSkeletonProps {
  typeFilter: string;
  statusFilter: ENUM_CHANNEL_STATUS | ENUM_OFFER_STATUS | string;
}

export const ProjectCardSkeleton: FC<ProjectCardSkeletonProps> = ({
  typeFilter,
  statusFilter,
}) => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[20px]">
      <div
        className={`${styles.wrapper} ${
          typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT &&
          statusFilter === ENUM_ADV_MANAGER_PROJECT_STATUS.COMPLETED
            ? styles.completed
            : ""
        }`}
      >
        <div
          className={`${styles.card} ${
            typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT
              ? // && statusFilter !== advManagerProjectStatusFilter.completed
                styles.manager_chat
              : ""
          } ${
            typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT &&
            statusFilter === ENUM_ADV_MANAGER_PROJECT_STATUS.COMPLETED
              ? styles.card__manager_completed
              : ""
          }`}
        >
          <div className={styles.card__description}>
            <div className={styles.card__description__data}>
              <div className={styles.card__description__data__title}>
                <Skeleton className="h-4 w-[80px]" />
                <Skeleton className="h-3 w-[100px]" />
              </div>
              <div className={styles.card__description__data__date}>
                <Skeleton className="h-3 w-[100px]" />
                <Skeleton className="h-3 w-[100px]" />
              </div>
            </div>
            <Skeleton className="w-full h-full rounded-[10px]" />
          </div>
          {typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT && (
            // statusFilter !== advManagerProjectStatusFilter.completed &&
            <div className={`${styles.chat__btn} display__hide__min__md`}>
              <Skeleton className="h-full w-full rounded-[10px]" />
            </div>
          )}

          <div className={styles.card__info}>
            <div className={styles.card__info__data}>
              <Skeleton className="h-full w-full rounded-[10px]" />
              <Skeleton className="h-full w-full rounded-[10px]" />
              <Skeleton className="h-full w-full rounded-[10px]" />
              {typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT &&
                statusFilter === ENUM_ADV_MANAGER_PROJECT_STATUS.COMPLETED && (
                  <Skeleton className="h-full w-full rounded-[10px] min-w-[190px]" />
                )}
            </div>

            {typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT &&
            statusFilter === ENUM_ADV_MANAGER_PROJECT_STATUS.REQUEST_APPROVE ? (
              <div className={styles.card__info__icons_manager_request_approve}>
                <div>
                  <Skeleton className="w-4/6 h-3" />
                  <Skeleton className="w-3/6 h-3" />
                </div>
                <Skeleton className="w-full h-full rounded-[15px] min-h-11" />
              </div>
            ) : typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT &&
              statusFilter === ENUM_ADV_MANAGER_PROJECT_STATUS.COMPLETED ? (
              <div className={styles.card__info__icons_manager_completed}>
                <div className={styles.top}>
                  <Skeleton className={`w-full h-full rounded-[10px]`} />
                  <Skeleton className={`w-full h-full rounded-[10px]`} />
                </div>
                <div className={styles.bottom}>
                  <Skeleton className={`w-full h-full rounded-[10px]`} />
                  <Skeleton className={`w-full h-full rounded-[10px]`} />
                </div>
              </div>
            ) : typeFilter === ENUM_PROJECT_TYPES.MANAGER_PROJECT &&
              statusFilter === ENUM_ADV_MANAGER_PROJECT_STATUS.ACTIVE ? (
              <div className={styles.card__info__icons_manager_active}>
                <Skeleton className={`w-full h-full rounded-[10px]`} />
                <Skeleton className={`w-full h-full rounded-[10px]`} />
                <Skeleton className={`w-full h-full rounded-[10px]`} />
                <Skeleton className={`w-full h-full rounded-[10px]`} />
              </div>
            ) : typeFilter === ENUM_PROJECT_TYPES.MY_PROJECT &&
              statusFilter === ENUM_ADV_MY_PROJECT_STATUS.COMPLETED ? (
              <div className={styles.card__info__icons_completed}>
                <div className={styles.icons}>
                  <Skeleton className="w-full h-full rounded-[8px]" />
                  <Skeleton className="w-full h-full rounded-[8px]" />
                </div>
                <Skeleton className="w-full h-full rounded-[8px]" />
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
