import { CheckIcon } from "lucide-react";
import { FC, InputHTMLAttributes, useEffect, useState } from "react";
import styles from "./styles.module.scss";

interface CustomCheckboxProps extends InputHTMLAttributes<HTMLButtonElement> {
  isSelected?: boolean;
  handleChange?: () => void;
  handleChangeSelected?: (selected: boolean) => void;
}

export const CustomCheckbox: FC<CustomCheckboxProps> = ({
  isSelected = false,
  handleChange,
  handleChangeSelected,
  ...props
}) => {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setChecked(isSelected);
  }, [isSelected]);

  const handleOnClick = () => {
    setChecked(!checked);
    handleChange && handleChange();
    handleChangeSelected && handleChangeSelected(!checked);
  };

  return (
    <button
      {...props}
      onClick={handleOnClick}
      type="button"
      className={`${props?.className} ${styles.wrapper} ${
        checked ? styles.selected : ""
      }`}
    >
      <CheckIcon />
    </button>
  );
};
