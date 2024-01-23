import { FC, FormHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface MyButtonProps extends FormHTMLAttributes<HTMLFormElement> {}

export const MyForm: FC<MyButtonProps> = (props) => {
  return <form className={styles.form} {...props} />;
};