import { Skeleton } from "@shared/ui";
import { FC } from "react";

export const SkeletonChatMessage: FC = () => {
  return (
    <Skeleton className="bg-skeleton-light rounded-[10px] h-[50px] w-[70%]" />
  );
};
