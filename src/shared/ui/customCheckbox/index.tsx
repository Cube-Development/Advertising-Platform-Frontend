import { FC } from "react";
import styles from "./styles.module.scss";
import { CheckIcon } from "lucide-react";

interface CustomCheckboxProps {
  isSelected?: boolean;
  className?: string;
}

export const CustomCheckbox: FC<CustomCheckboxProps> = ({
  isSelected,
  className = "",
}) => {
  return (
    <div
      className={`${className} ${styles.wrapper} ${
        isSelected ? styles.selected : ""
      }`}
    >
      <CheckIcon />
    </div>
  );
};
