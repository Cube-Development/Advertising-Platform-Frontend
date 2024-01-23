import { FC, InputHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const MyInput: FC<MyInputProps> = (props) => {
  return <input className={styles.input} {...props} />;
};