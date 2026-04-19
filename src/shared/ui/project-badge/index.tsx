import { FC, ReactNode } from "react";
import { Folder, X } from "lucide-react";
import { Card, CardContent, cn } from "@shared/ui";

export interface ProjectBadgeProps {
  className?: string;
  text: ReactNode;
  onClose: () => void;
}

export const ProjectBadge: FC<ProjectBadgeProps> = ({
  className,
  text,
  onClose,
}) => {
  return (
    <Card
      className={cn("rounded-xl", className)}
      style={{
        backgroundColor: "rgba(12, 162, 184, 0.10)",
      }}
    >
      <CardContent className="p-4 gap-4 grid">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 min-w-0">
            <Folder className="h-5 w-5 text-yellow-400 fill-yellow-400 shrink-0 hidden sm:block" />
            <div className="text-[13px] sm:text-[14px] md:text-[15px] font-normal text-[var(--Personal-colors-black)] leading-tight break-words">
              {text}
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D1DFFA] text-[var(--Personal-colors-main)] transition-colors hover:bg-[#C2D4F6] hover:opacity-80 focus:outline-none shrink-0"
            aria-label="Close project mode"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
