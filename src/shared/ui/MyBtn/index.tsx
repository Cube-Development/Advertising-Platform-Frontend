import React, { FC, ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const MyButton: FC<MyButtonProps> = ({ ...props }) => {
  props.className = `${styles.button} ${props.className}`;
  return <button {...props} />;
};
