import { Skeleton } from "@shared/ui";
import { FC } from "react";

interface SkeletonSmallCatalogCardProps {}

export const SkeletonSmallCatalogCard: FC<
  SkeletonSmallCatalogCardProps
> = () => {
  return (
    <Skeleton className="bg-skeleton-light mobile-xl:h-[80px] mobile:h-[60px] h-[56px] mobile-xl:rounded-[10px] rounded-[5px] shadow-[0px_1px_5px_0.5px_rgba(0,0,0,0.15)]"></Skeleton>
  );
};
