import { forwardRef, ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttons_type?: string;
}

export const MyButton = forwardRef<HTMLButtonElement, MyButtonProps>(
  ({ buttons_type = "button__blue", ...props }, ref) => {
    const combinedClassName = `${props.className || ""} ${styles.button} ${props.disabled ? styles.button__grey : styles[buttons_type]}`;
    return <button {...props} ref={ref} className={combinedClassName} />;
  },
);
