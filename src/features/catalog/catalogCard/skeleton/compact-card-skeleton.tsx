import { Skeleton } from "@shared/ui";
import { FC } from "react";

export const SkeletonCompactCatalogCard: FC = () => {
  return (
    <Skeleton className="bg-skeleton-light h-[68px] rounded-xl shadow-[0px_1px_4px_0.5px_rgba(0,0,0,0.1)]">
      <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-3 items-center p-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3.5 w-[60%]" />
          <Skeleton className="h-2.5 w-[40%]" />
        </div>
        <Skeleton className="hidden lg:block h-[44px] w-[160px] rounded-lg" />
        <Skeleton className="hidden md:block size-9 rounded-full" />
        <Skeleton className="h-[44px] w-[130px] rounded-lg" />
      </div>
    </Skeleton>
  );
};
