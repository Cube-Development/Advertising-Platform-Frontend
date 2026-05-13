import type { ReactNode } from "react";

export interface FeatureItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: React.ComponentType<any>;
  text: string;
}

interface CtaHeroProps {
  title: ReactNode;
  subtitle: ReactNode;
  features: FeatureItem[];
  action: ReactNode;
}

export function CtaHero({ title, subtitle, features, action }: CtaHeroProps) {
  return (
    <div className="flex flex-col items-center text-center gap-4 md:gap-5 lg:items-start lg:text-left">
      <div className="space-y-2 md:space-y-3 lg:space-y-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold leading-[1.1] tracking-tight text-[#0F2A4D]">
          {title}
        </h2>
        <p className="text-base sm:text-lg font-semibold lg:text-xl text-[#1AB5C5]">
          {subtitle}
        </p>
      </div>

      <div className="space-y-3 md:space-y-4">
        {features.map(({ Icon, text }, i) => (
          <div key={i} className="flex items-center gap-3 md:gap-4 text-left">
            <div className="flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl shrink-0 bg-[#1AB5C5]/10 text-[#1AB5C5]">
              <Icon size={24} />
            </div>
            <span className="text-sm sm:text-base text-[#94A3B8] font-medium">
              {text}
            </span>
          </div>
        ))}
      </div>

      {action}
    </div>
  );
}
