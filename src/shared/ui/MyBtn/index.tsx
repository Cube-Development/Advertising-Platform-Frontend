import { FC, ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const MyButton: FC<MyButtonProps & { customClass?: string }> = ({ customClass, ...props }) => {
  const combinedClassName = `${styles.button} ${customClass || ''}`;
  return <button className={combinedClassName} {...props} />;
};