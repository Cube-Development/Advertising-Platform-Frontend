import { cn, Skeleton } from "@shared/ui";
import { type FC } from "react";

interface ISkeletonAccountingCardProps {
  isDisabled: boolean;
}

export const SkeletonAccountingCard: FC<ISkeletonAccountingCardProps> = ({
  isDisabled,
}) => {
  return (
    <Skeleton className="bg-skeleton-light rounded-lg p-6 grid gap-4 relative">
      <div className="flex md:items-center justify-between flex-col-reverse md:flex-row gap-3">
        <Skeleton className="h-5 w-60" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="grid gap-1">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-6">
        <Skeleton className="h-[110px] md:h-[134px]" />
        <Skeleton className="h-[110px] md:h-[134px]" />
      </div>
      <div
        className={cn(
          "grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-6",
          isDisabled && "hidden",
        )}
      >
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>
    </Skeleton>
  );
};
