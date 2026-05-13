import { CheckCircle } from "@solar-icons/react";
import { Card, cn } from "@shared/ui";
import React from "react";

interface StepCardProps {
  id: number;
  icon: React.ReactNode;
  isCompleted: boolean;
  isConnected: boolean;
  className?: string;
}

export const StepCard = React.forwardRef<HTMLDivElement, StepCardProps>(
  ({ id, icon, isCompleted, isConnected, className }, ref) => {
    return (
      <div
        ref={ref}
        data-connected={isConnected}
        className={cn("relative", className)}
      >
        <Card
          className={cn(
            "hero-card relative w-[70px] h-[70px] md:w-[90px] md:h-[90px] rounded-xl flex items-center justify-center",
            "transition-all duration-700 select-none border-[1.5px] ring-0 p-0 !overflow-visible",
            isConnected || isCompleted
              ? "bg-[#dcf8fb]/95 border-[#0badc2]/30 shadow-[0_4px_18px_rgba(11,173,194,0.15)]"
              : "bg-white border-slate-200/60 shadow-sm",
          )}
        >
          {/* Icon circle */}
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-700 text-white",
              isConnected || isCompleted
                ? "bg-gradient-to-tr from-[#0badc2] to-[#0aa5be]"
                : "bg-slate-100 text-slate-400",
            )}
          >
            {icon}
          </div>

          {/* Checkmark */}
          {isCompleted && (
            <div className="absolute -top-2 -right-2">
              <CheckCircle size={22} weight="Bold" color="#0badc2" />
            </div>
          )}
        </Card>
      </div>
    );
  },
);

StepCard.displayName = "StepCard";
