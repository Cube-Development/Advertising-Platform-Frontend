import { BREAKPOINT } from "@shared/config";
import { Skeleton } from "@shared/ui";
import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";

export const SkeletonHistoryCard: FC = () => {
  const [screen, setScreen] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {screen > BREAKPOINT.MD ? (
        <Skeleton className="bg-skeleton-light rounded-[12px]">
          <div className={styles.card}>
            <div className={styles.info}>
              <Skeleton className="h-3 w-4/5" />
            </div>
            <div className={styles.info}>
              <Skeleton className="h-3 w-3/5" />
            </div>
            <div className={styles.info}>
              <Skeleton className="h-3 w-3/5" />
            </div>
            <div className={styles.info}>
              <Skeleton className="h-3 w-3/5" />
            </div>
            <div className={styles.info}>
              <Skeleton className="h-3 w-3/5" />
            </div>
          </div>
        </Skeleton>
      ) : (
        <Skeleton className="bg-skeleton-light rounded-[4px]">
          <div className={styles.card__xs}>
            <div className={styles.top}>
              <Skeleton className="h-3 w-[120px]" />
              <Skeleton className="h-3 w-[140px]" />
            </div>
            <div className={styles.bottom}>
              <div className={styles.row}>
                <Skeleton className="h-3 w-[80px]" />
                <Skeleton className="h-3 w-[60px]" />
              </div>
              <div className={styles.row}>
                <Skeleton className="h-3 w-[80px]" />
                <Skeleton className="h-3 w-[60px]" />
              </div>
              <div className={styles.row}>
                <Skeleton className="h-3 w-[80px]" />
                <Skeleton className="h-3 w-[80px]" />
              </div>
            </div>
          </div>
        </Skeleton>
      )}
    </>
  );
};
