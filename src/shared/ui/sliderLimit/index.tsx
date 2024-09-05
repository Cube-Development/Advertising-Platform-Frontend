import { FC, InputHTMLAttributes } from "react";
import styles from "./styles.module.scss"; // Подключаем файл со стилями

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const MySliderLimit: FC<MyInputProps> = ({ ...props }) => {
  props.className = `${styles.slider}`;
  const gradientColor = `#E5E5E5`;

  return <input {...props} style={{ background: gradientColor }} />;
};
