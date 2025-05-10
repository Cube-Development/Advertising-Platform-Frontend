import { Skeleton } from "@shared/ui";
import { FC } from "react";

export const SkeletonDisplay: FC = () => {
  return (
    <div className="flex items-center justify-center my-2">
      <div className="relative w-full max-w-[350px]  aspect-[350/720] rounded-[50px] overflow-hidden">
        <Skeleton className="w-full h-full rounded-[60px] bg-gray-800" />
        <div className="absolute z-10 flex space-x-2 -translate-x-1/2 top-4 left-1/2">
          <Skeleton className="w-[120px] bg-gray-700 rounded-full h-7" />
        </div>
        <Skeleton className="absolute inset-0 mx-3 mb-[60px] mt-[80px] rounded-[0px] bg-gray-900 opacity-70" />
      </div>
    </div>
  );
};
