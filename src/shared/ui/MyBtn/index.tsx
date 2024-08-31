import { FC, ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttons_type?: string;
}

export const MyButton: FC<MyButtonProps> = ({
  buttons_type = "button__blue",
  ...props
}) => {
  const combinedClassName = `${props.className || ""} ${styles.button}  ${styles[buttons_type]}`;
  return <button {...props} className={combinedClassName} />;
};
