import { FC, InputHTMLAttributes } from "react";
import styles from "./styles.module.scss"; // Подключаем файл со стилями

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const MySliderSex: FC<MyInputProps> = ({ ...props }) => {
  props.className = `${styles.slider}`;
  const gradientColor = `linear-gradient(90deg, #4772e6 ${props.value}%, #f904d9 ${props.value}%)`;

  return <input {...props} style={{ background: gradientColor }} />;
};
