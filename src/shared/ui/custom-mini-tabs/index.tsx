// shared/ui/custom-tabs.tsx
import { Slot } from "@radix-ui/react-slot";
import React from "react";
import { cn } from "../shadcn-ui";

interface CustomMiniTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CustomMiniTabs({
  children,
  className,
  ...props
}: CustomMiniTabsProps) {
  return (
    <div
      className={cn("flex p-1 bg-gray-100 rounded-xl", className)}
      {...props}
    >
      {children}
    </div>
  );
}

CustomMiniTabs.displayName = "CustomMiniTabs";

interface CustomMiniTabItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  asChild?: boolean;
}

export const CustomMiniTabItem = React.forwardRef<
  HTMLButtonElement,
  CustomMiniTabItemProps
>(({ active, asChild = false, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      type="button"
      className={cn(
        "flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center",
        active
          ? "bg-white text-blue-600 shadow-md"
          : "text-gray-600 hover:text-blue-600",
        className,
      )}
      {...props}
    />
  );
});
CustomMiniTabItem.displayName = "CustomMiniTabItem";
