import { IOption } from "@shared/types/common";
import { FC, SelectHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import styles from './styles.module.scss';

interface MySelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: IOption[];
  defaultValue: string;
}

export const MySelect: FC<MySelectProps> = ({ options, defaultValue, ...rest }) => {
  const { t } = useTranslation();
  const optionsWithDefault = [{ label: t(defaultValue), value: '' }, ...options];

  return (
    <select {...rest} className={styles.wrapper}>
      {optionsWithDefault.map((option, index) => (
        <option key={index} value={option.value} >
          {option.label}
        </option>
      ))}
    </select>
  );
};