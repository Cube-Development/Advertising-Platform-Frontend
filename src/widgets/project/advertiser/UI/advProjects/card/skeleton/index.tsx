import { FC } from "react";
import styles from "./styles.module.scss";
import {
  advManagerProjectStatusFilter,
  myProjectStatusFilter,
  projectTypesFilter,
} from "@entities/project";
import { Skeleton } from "@shared/ui";
import { channelStatusFilter } from "@entities/channel";
import { offerStatusFilter } from "@entities/offer";

interface ProjectCardSkeletonProps {
  typeFilter: string;
  statusFilter: channelStatusFilter | offerStatusFilter | string;
}

export const ProjectCardSkeleton: FC<ProjectCardSkeletonProps> = ({
  typeFilter,
  statusFilter,
}) => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[12px]">
      <div className={styles.wrapper}>
        <div className={styles.card}>
          <div className={styles.card__description}>
            <div className={styles.card__description__data}>
              <div className={styles.card__description__data__title}>
                <Skeleton className="h-3 w-[150px]" />
                <Skeleton className="h-2 w-[100px]" />
              </div>
              <div className={styles.card__description__data__date}>
                <Skeleton className="h-2 w-[100px]" />
                <Skeleton className="h-2 w-[100px]" />
              </div>
            </div>
            <Skeleton className="w-full h-full rounded-[12px]" />
          </div>
          <div className={styles.card__info}>
            <div className={styles.card__info__data}>
              <Skeleton className="h-2 w-[100px]" />
              <Skeleton className="h-2 w-[150px]" />
              <Skeleton className="h-2 w-[200px]" />
            </div>

            {typeFilter === projectTypesFilter.managerProject &&
            statusFilter === advManagerProjectStatusFilter.request_approve ? (
              <Skeleton className="w-full h-full rounded-[8px]" />
            ) : typeFilter === projectTypesFilter.myProject &&
              statusFilter === myProjectStatusFilter.completed ? (
              <div className={styles.card__info__icons_completed}>
                <Skeleton className="w-full h-full rounded-[8px]" />
                <Skeleton className="w-full h-full rounded-[8px]" />
              </div>
            ) : (
              <div className={styles.card__info__icons}>
                <Skeleton className="w-full h-full rounded-[8px]" />
                <Skeleton className="w-full h-full rounded-[8px]" />
                <Skeleton className="w-full h-full rounded-[8px]" />
                <Skeleton className="w-full h-full rounded-[8px]" />
                <Skeleton className="w-full h-full rounded-[8px]" />
              </div>
            )}
          </div>
        </div>
        <Skeleton className="w-full h-full rounded-[12px]" />
      </div>
    </Skeleton>
  );
};
