import { channelStatusFilter } from "@entities/channel";
import { offerStatusFilter } from "@entities/offer";
import {
  advManagerProjectStatusFilter,
  myProjectStatusFilter,
  projectTypesFilter,
} from "@entities/project";
import { Skeleton } from "@shared/ui";
import { FC } from "react";
import styles from "./styles.module.scss";

interface ProjectCardSkeletonProps {
  typeFilter: string;
  statusFilter: channelStatusFilter | offerStatusFilter | string;
}

export const ProjectCardSkeleton: FC<ProjectCardSkeletonProps> = ({
  typeFilter,
  statusFilter,
}) => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[20px]">
      <div className={styles.wrapper}>
        <div
          className={`${styles.card} ${typeFilter === projectTypesFilter.managerProject ? styles.manager_chat : ""}`}
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
          {typeFilter === projectTypesFilter.managerProject && (
            <div className={`${styles.chat__btn} display__hide__min__md`}>
              <Skeleton className="h-full w-full rounded-[10px]" />
            </div>
          )}

          <div className={styles.card__info}>
            <div className={styles.card__info__data}>
              <Skeleton className="h-full w-full rounded-[10px]" />
              <Skeleton className="h-full w-full rounded-[10px]" />
              <Skeleton className="h-full w-full rounded-[10px]" />
            </div>

            {typeFilter === projectTypesFilter.managerProject &&
            statusFilter === advManagerProjectStatusFilter.request_approve ? (
              <div className={styles.card__info__icons_manager_request_approve}>
                <div>
                  <Skeleton className="h-3 w-4/6" />
                  <Skeleton className="h-3 w-3/6" />
                </div>
                <Skeleton className="w-full h-full rounded-[15px] min-h-11" />
              </div>
            ) : typeFilter === projectTypesFilter.managerProject &&
              statusFilter === advManagerProjectStatusFilter.active ? (
              <div className={styles.card__info__icons_manager_active}>
                <Skeleton className={`w-full h-full rounded-[10px]`} />
                <Skeleton className={`w-full h-full rounded-[10px]`} />
                <Skeleton className={`w-full h-full rounded-[10px]`} />
                <Skeleton className={`w-full h-full rounded-[10px]`} />
              </div>
            ) : typeFilter === projectTypesFilter.myProject &&
              statusFilter === myProjectStatusFilter.completed ? (
              <div className={styles.card__info__icons_completed}>
                <Skeleton className="w-full h-full rounded-[8px]" />
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
        <Skeleton className="w-full h-full rounded-bl-[10px] rounded-br-[10px]" />
      </div>
    </Skeleton>
  );
};
