import { cn, Skeleton } from "@shared/ui";
import { FC } from "react";
import styles from "./styles.module.scss";

export const CatalogCartSkeleton: FC = () => {
  return (
    <Skeleton className={cn(styles.wrapper, "bg-skeleton-light grid ")}>
      <div className="h-[65px]"></div>
      <Skeleton className="rounded-xl min-w-[190px] h-[50px] mx-4" />
    </Skeleton>
  );
};
