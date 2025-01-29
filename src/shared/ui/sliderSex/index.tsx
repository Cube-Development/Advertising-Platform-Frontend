import { FC, InputHTMLAttributes } from "react";
import styles from "./styles.module.scss"; // Подключаем файл со стилями

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const MySliderSex: FC<MyInputProps> = ({ ...props }) => {
  props.className = `${styles.slider}`;
  const gradientColor = `linear-gradient(90deg, var(--color-sex-man) ${props.value}%, var(--color-sex-woman) ${props.value}%)`;

  return <input {...props} style={{ background: gradientColor }} />;
};
