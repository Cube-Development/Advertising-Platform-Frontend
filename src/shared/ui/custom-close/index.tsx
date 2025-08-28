import { CircleX, X } from "lucide-react";
import { FC } from "react";
import { cn } from "../shadcn-ui";

interface IIndexProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const CustomCloseButton: FC<IIndexProps> = ({ className, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        "hover:bg-accent absolute top-1/2 right-1 -translate-y-1/2 p-4 rounded-full ",
        className,
      )}
    >
      <CircleX
        size={24}
        strokeWidth={2}
        className="text-[var(--Personal-colors-main)]"
      />
    </button>
  );
};
