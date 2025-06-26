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
}

export const CustomTitle: FC<ICustomTitleProps> = ({
  title,
  icon,
  className,
  variant,
}) => {
  console.log("variant", variant);
  return (
    <div className={cn(backgroundVariants({ variant }), className)}>
      <p className="truncate">{title}</p>
      {!!icon && icon}
    </div>
  );
};
