import { BREAKPOINT } from "@shared/config/common";
import { Skeleton } from "@shared/ui";
import { FC } from "react";
import styles from "./styles.module.scss";
import { useWindowWidth } from "@shared/hooks";

interface SkeletonCatalogCardProps {}

export const SkeletonCatalogCard: FC<SkeletonCatalogCardProps> = () => {
  const screen = useWindowWidth();

  return (
    <Skeleton className="bg-skeleton-light rounded-[15px]">
      <div className={styles.wrapper}>
        <div className={styles.channel}>
          <div className={styles.channel__top}>
            <div className={styles.channel__logo}>
              <div className={styles.logo}>
                <Skeleton className="h-[80px] w-[80px] rounded-full" />
                {screen >= BREAKPOINT.MD && (
                  <div className={styles.rate}>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        className="h-[10px] w-[10px] rounded-full"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.channel__info}>
              <div className={styles.info}>
                <Skeleton className="h-4 w-3/5 max-w-32" />
                <Skeleton className="h-4 w-3/5 max-w-32" />
                {screen < BREAKPOINT.MD ? (
                  <div className={styles.channel__rate}>
                    <div className={styles.rate}>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton
                          key={index}
                          className="h-[15px] w-[15px] rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <Skeleton className="h-4 w-11/12" />
                )}
              </div>
            </div>
            {screen >= BREAKPOINT.LG && (
              <Skeleton className="w-full h-full rounded-[10px]" />
            )}
            <div className={styles.channel__cross}>
              <Skeleton className="h-2 w-[75px]" />
              <div className={styles.circle}>
                <Skeleton className="h-[60px] w-[60px] rounded-full" />
              </div>
            </div>
          </div>
          {screen < BREAKPOINT.MD && <Skeleton className="h-4 w-3/5" />}
          {screen < BREAKPOINT.LG && (
            <Skeleton className="w-full h-[35px] rounded-[10px]" />
          )}
        </div>
        <Skeleton className="w-full h-full rounded-[15px]" />
      </div>
    </Skeleton>
  );
};
