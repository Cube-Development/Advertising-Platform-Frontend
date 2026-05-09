import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardHeader, cn } from "@shared/ui/";
import type { PlatformData } from "../model/mock-data";

interface PlatformCardProps
  extends React.ComponentPropsWithoutRef<typeof Card> {
  data: PlatformData;
}

export const PlatformCard = forwardRef<HTMLDivElement, PlatformCardProps>(
  ({ data, className, ...props }, ref) => {
    const { t } = useTranslation();
    return (
      <Card
        ref={ref}
        className={cn(
          "w-[150px] md:w-[170px] py-2 md:py-4 lg:w-auto rounded-[16px] lg:rounded-[24px] z-10 border-none",
          "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
          className,
        )}
        {...props}
      >
        <CardHeader className="grid py-0 px-2 md:px-4 grid-cols-[auto_1fr] items-center gap-x-2 lg:gap-x-4 gap-y-1 lg:gap-y-0.5">
          <div className="row-span-1 lg:row-span-2 flex-shrink-0 flex items-center justify-center rounded-xl lg:rounded-2xl w-10 h-10 lg:w-14 lg:h-14 bg-gray-50/80 [&>svg]:w-6 [&>svg]:h-6">
            {data.icon}
          </div>
          <span className="text-base font-bold leading-none tracking-tight text-gray-900 lg:text-lg">
            {t(data.name)}
          </span>
          <div className="col-span-2 lg:col-span-1 lg:col-start-2 text-[10px] lg:text-sm font-medium text-gray-500 truncate">
            <span className="text-[#37a8b6] font-bold text-[14px] lg:text-base">
              {data.count}
            </span>{" "}
            {t(data.label)}
          </div>
        </CardHeader>
      </Card>
    );
  },
);

PlatformCard.displayName = "PlatformCard";
