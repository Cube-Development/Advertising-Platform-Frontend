import { Skeleton } from "@shared/ui";
import { FC } from "react";
import styles from "./styles.module.scss";
import { channelStatusFilter } from "@entities/channel";

interface ChannelCardSkeletonProps {
  statusFilter: channelStatusFilter;
}

export const ChannelCardSkeleton: FC<ChannelCardSkeletonProps> = ({
  statusFilter,
}) => {
  const isActive =
    statusFilter === channelStatusFilter.active ||
    statusFilter === channelStatusFilter.inactive;
  return (
    <Skeleton className="bg-skeleton-light rounded-[20px]">
      <div
        className={`${styles.wrapper} ${statusFilter === channelStatusFilter.active || statusFilter === channelStatusFilter.inactive ? styles.isActive : styles.isNotActive}`}
      >
        <div className={styles.card}>
          <div className={styles.card__left}>
            <div className={styles.logo}>
              <Skeleton className="h-[80px] w-[80px] rounded-full" />
            </div>
            <div className={styles.text}>
              <Skeleton className="h-3 w-3/5" />
              <Skeleton className="h-2 w-2/5" />
            </div>
            {statusFilter !== channelStatusFilter.banned && (
              <div className={styles.params}>
                <Skeleton className="h-[30px] w-[30px] rounded-full" />
                <Skeleton className="h-[30px] w-[30px] rounded-full" />
              </div>
            )}
            <div className={styles.status}>
              <Skeleton className="w-full h-full rounded-[12px]" />
            </div>
          </div>
          {statusFilter === channelStatusFilter.active ? (
            <div className={styles.card__info}>
              <div className={styles.card__info__data}>
                <Skeleton className="w-full h-full rounded-[12px]" />
                <Skeleton className="w-full h-full rounded-[12px]" />
              </div>
              <div className={styles.card__info__icons}>
                <Skeleton className="w-full h-full rounded-[8px]" />
                <Skeleton className="w-full h-full rounded-[8px]" />
                <Skeleton className="w-full h-full rounded-[8px]" />
              </div>
            </div>
          ) : statusFilter === channelStatusFilter.inactive ? (
            <div className={`${styles.card__info} ${styles.inactive}`}>
              <div className={styles.card__info__activate}>
                <Skeleton className="w-full h-full rounded-[12px]" />
              </div>
              <div className={styles.card__info__buttons}>
                <Skeleton className="w-full h-full rounded-[12px]" />
                <Skeleton className="w-full h-full rounded-[12px]" />
              </div>
            </div>
          ) : (
            <div className={styles.card__info}>
              <div className={styles.card__info__text}>
                <Skeleton className="w-full h-3" />
                <Skeleton className="w-3/5 h-3" />
              </div>
              <div className={styles.card__info__buttons}>
                <Skeleton className="w-full h-full rounded-[12px]" />
                <Skeleton className="w-full h-full rounded-[12px]" />
              </div>
            </div>
          )}
        </div>
        {isActive && (
          <div className={styles.buttons}>
            <Skeleton className="w-full h-full rounded-[12px]" />
            <Skeleton className="w-full h-full rounded-[12px]" />
            <Skeleton className="w-full h-full rounded-[12px]" />
          </div>
        )}
      </div>
    </Skeleton>
  );
};
