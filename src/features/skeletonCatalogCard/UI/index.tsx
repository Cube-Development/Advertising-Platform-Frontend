import { Skeleton } from "@shared/ui/shadcn-ui/ui/skeleton";
import { FC } from "react";
import styles from "./styles.module.scss";

interface SkeletonCatalogCardProps {}

export const SkeletonCatalogCard: FC<SkeletonCatalogCardProps> = () => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[15px]">
      <div className={styles.wrapper}>
        <div className={styles.channel__top}>
          <div className={styles.channel__logo}>
            <Skeleton className="h-[80px] w-[80px] rounded-full" />
            <div>
              <div className={styles.channel__rate}>
                <Skeleton className="h-[10px] w-[10px] rounded-full" />
                <Skeleton className="h-[10px] w-[10px] rounded-full" />
                <Skeleton className="h-[10px] w-[10px] rounded-full" />
                <Skeleton className="h-[10px] w-[10px] rounded-full" />
                <Skeleton className="h-[10px] w-[10px] rounded-full" />
              </div>
            </div>
          </div>
          <div className={styles.channel__description}>
            <div className={styles.description}>
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div>
          <Skeleton className="w-full h-full rounded-[10px]" />
          <div className={styles.channel__cross}>
            <Skeleton className="h-2 w-[75px]" />
            <div className={styles.circle}>
              <Skeleton className="h-[60px] w-[60px] rounded-full" />
            </div>
          </div>
        </div>
        <Skeleton className="w-full h-full rounded-[12px]" />
      </div>
    </Skeleton>
  );
};
