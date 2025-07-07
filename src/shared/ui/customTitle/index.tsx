import { FC } from "react";
import styles from "./styles.module.scss";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "../shadcn-ui";

const backgroundVariants = cva(styles.wrapper, {
  variants: {
    variant: {
      default: "",
      primary: cn("gradient_color", styles.primary),
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface ICustomTitleProps extends VariantProps<typeof backgroundVariants> {
  title: string;
  icon?: React.ReactNode;
  className?: string;
  truncate?: boolean;
}

export const CustomTitle: FC<ICustomTitleProps> = ({
  title,
  icon,
  className,
  variant,
  truncate = true,
}) => {
  return (
    <div className={cn(backgroundVariants({ variant }), className)}>
      <p className={cn(truncate && "truncate")}>{title}</p>
      {!!icon && icon}
    </div>
  );
};
