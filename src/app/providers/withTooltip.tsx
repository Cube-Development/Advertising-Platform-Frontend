import { TooltipProvider } from "@shared/ui";

export const withTooltip = (Component: React.FC) => {
  return () => (
    <TooltipProvider>
      <Component />
    </TooltipProvider>
  );
};
