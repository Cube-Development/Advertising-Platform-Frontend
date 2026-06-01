import { forwardRef, InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const MyInput = forwardRef<HTMLInputElement, MyInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={`${styles.input} ${className ?? ""}`}
      />
    );
  },
);

MyInput.displayName = "MyInput";
