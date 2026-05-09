import type { ReactNode } from "react";
import { cn } from "./shadcn-ui";

interface CustomHeadingProps {
  title: ReactNode;
  subtitle: ReactNode;
  className?: string;
}

export function CustomHeading({
  title,
  subtitle,
  className,
}: CustomHeadingProps) {
  return (
    <div className={cn("grid gap-2 text-center md:gap-3", className)}>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--Personal-colors-black)]">
        {title}
      </h2>
      <p className="max-w-2xl mx-auto text-sm leading-relaxed sm:text-xl text-slate-500 font-semibold">
        {subtitle}
      </p>
    </div>
  );
}
