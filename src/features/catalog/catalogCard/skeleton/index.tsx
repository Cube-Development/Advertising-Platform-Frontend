import { BREAKPOINT } from "@shared/config/common";
import { Skeleton } from "@shared/ui";
import { FC } from "react";
import styles from "./styles.module.scss";
import { useWindowWidth } from "@shared/hooks";

interface SkeletonCatalogCardProps {}

export const SkeletonCatalogCard: FC<SkeletonCatalogCardProps> = () => {
  const screen = useWindowWidth();

  return (
    <Skeleton className="bg-skeleton-light rounded-[15px] shadow-md">
      <div className={styles.wrapper}>
        <div className={styles.channel}>
          <div className={styles.channel__top}>
            <div className={styles.channel__logo}>
              <div className={styles.logo}>
                <Skeleton className="md:h-[80px] md:w-[80px] sm:h-[60px] sm:w-[60px] h-[40px] w-[40px] rounded-full" />
                <div className={styles.rate}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      className="h-[10px] w-[10px] rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.channel__info}>
              <div className={styles.info}>
                <Skeleton className="h-4 w-[80%]" />
                <div className="grid justify-start grid-flow-col gap-1 justify-items-start">
                  <Skeleton className="h-[10px] w-[10px] rounded-full" />
                  <Skeleton className="h-[10px] w-[10px] rounded-full" />
                  <Skeleton className="h-[10px] w-[10px] rounded-full" />
                </div>
                <Skeleton className="w-3/5 h-4 max-w-32" />
                {screen >= BREAKPOINT.MD && (
                  <Skeleton className="w-11/12 h-4" />
                )}
              </div>
            </div>
            {screen >= BREAKPOINT.LG && (
              <Skeleton className="w-full h-full rounded-[10px]" />
            )}
            <div className={styles.channel__cross}>
              <Skeleton className="h-2 w-[60px]" />
              <div className={styles.circle}>
                <Skeleton className="md:h-[60px] md:w-[60px] w-[48px] h-[48px] rounded-full" />
              </div>
            </div>
          </div>
          {screen < BREAKPOINT.MD && <Skeleton className="w-3/5 h-4" />}
          {screen < BREAKPOINT.LG && (
            <Skeleton className="w-full h-[35px] rounded-[10px]" />
          )}
        </div>
        <Skeleton className="w-full h-full rounded-b-[15px] rounded-t-[0px]" />
      </div>
    </Skeleton>
  );
};
