import { FC, InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const MyInput: FC<MyInputProps> = ({ ...props }) => {
  props.className = `${styles.input} ${props.className}`;
  return <input {...props} />;
};
