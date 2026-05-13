import { CheckCircle, LockKeyholeMinimalistic } from "@solar-icons/react";
import { useTranslation } from "react-i18next";
import type { Feature } from "../model/types";
import { cn } from "@shared/ui";

interface FeatureCardProps {
  feature: Feature;
  variant: "active" | "locked";
}

export function FeatureCard({ feature, variant }: FeatureCardProps) {
  const { t } = useTranslation();
  const isActive = variant === "active";

  return (
    <>
      <div
        className={cn(
          "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0",
          isActive
            ? "bg-gradient-to-br from-[#0badc2] to-[#0aa5be] text-white"
            : "bg-gradient-to-br from-[#d4dfe1] to-[#c2cfd3] text-white",
        )}
      >
        {feature.icon}
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <p
          className={cn(
            "font-medium text-sm leading-tight whitespace-normal",
            isActive ? "text-[#1a3a40]" : "text-[#6b8f96]",
          )}
        >
          {t(feature.name)}
        </p>
        <span
          className={cn(
            "text-xs mt-0.5 leading-relaxed whitespace-normal text-[10px]",
            isActive ? "text-[#6b8f96]" : "text-[#6b8f96]/70",
          )}
        >
          {t(feature.sub)}
        </span>
      </div>

      <div className="flex-shrink-0 ml-auto">
        {isActive ? (
          <CheckCircle weight="Bold" size={20} color="#0badc2" />
        ) : (
          <LockKeyholeMinimalistic weight="Bold" size={20} color="#c2cfd3" />
        )}
      </div>
    </>
  );
}
