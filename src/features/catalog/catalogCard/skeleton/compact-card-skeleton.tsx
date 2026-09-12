import { Skeleton } from "@shared/ui";
import { FC } from "react";

export const SkeletonCompactCatalogCard: FC = () => {
  return (
    <Skeleton className="bg-skeleton-light rounded-xl shadow-[0px_1px_4px_0.5px_rgba(0,0,0,0.1)]">
      <div className="flex items-stretch gap-1.5 md:grid md:grid-cols-[auto_1fr_auto_auto_auto] md:gap-2.5 md:items-center md:pl-[10px]">
        <div className="min-w-0 flex-1 flex flex-col md:contents">
          <div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-1.5 p-1.5 pl-[6px] md:contents">
            <Skeleton className="size-8 md:size-10 rounded-full" />
            <div className="flex flex-col gap-1 py-2">
              <Skeleton className="h-3.5 w-[60%]" />
              <Skeleton className="h-2.5 w-[40%]" />
            </div>
            <Skeleton className="hidden lg:block h-[44px] w-[160px] rounded-lg" />
            <Skeleton className="hidden md:block size-9 rounded-full" />
          </div>
        </div>
        <Skeleton className="min-h-[44px] w-[110px] md:w-[130px] self-stretch rounded-r-[7px] md:rounded-r-xl" />
      </div>
    </Skeleton>
  );
};
