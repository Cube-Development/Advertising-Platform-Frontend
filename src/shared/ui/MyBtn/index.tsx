import { FC, ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const MyButton: FC<MyButtonProps> = (props) => {
  return <button className={styles.button} {...props} />;
};