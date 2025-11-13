import { Skeleton } from "@shared/ui";
import styles from "./styles.module.scss";

export const SkeletonSavedProjectCard = () => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[20px]">
      <div className={`${styles.wrapper} `}>
        <div className={`${styles.card} ${styles.request_approve} `}>
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
            </div>
            <div className={styles.card__info__icons_manager_request_approve}>
              <div>
                <Skeleton className="h-3 w-5/6 max-w-[250px]" />
              </div>
              <Skeleton className="w-full h-full rounded-[15px] min-h-11" />
            </div>
          </div>
        </div>
        <Skeleton className="w-full h-full rounded-bl-[20px] rounded-br-[20px]" />
      </div>
    </Skeleton>
  );
};
