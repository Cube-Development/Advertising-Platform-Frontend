import { FC, InputHTMLAttributes } from "react";
import styles from './styles.module.scss'; // Подключаем файл со стилями

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const MySlider: FC<MyInputProps> = ({...props }) => {
  props.className = `${styles.slider} ${props.className}`;
  return <input {...props} />;
};
