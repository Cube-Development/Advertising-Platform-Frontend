import { BREAKPOINT } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";
import { IOption } from "@shared/types";
import { MultiSelect, MultiSelectProps } from "@shared/ui";
import { FC } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface SelectFilterProps extends MultiSelectProps {
  textData: string;
  options: IOption[];
  isRow?: boolean;
  onChangeOption: UseFormSetValue<any>;
  data?: any;
  typeData?: string;
  typeParameter: string;
  onChangeSort?: () => void;
}

export const SelectFilter: FC<SelectFilterProps> = ({
  options,
  data,
  typeData,
  typeParameter,
  onChangeOption,
  onChangeSort,
  isRow,
  textData,
  defaultValue,
  single = false,
  showButtonClear = true,
  disabled = false,
  showListClear = true,
  showCheckBox = true,
  hideText = false,
}) => {
  const { t } = useTranslation();
  const screen = useWindowWidth();
  const allText = { title: t(textData) };

  const handleMultiOptionsChange = (newOptions: (number | string)[]) => {
    if (onChangeSort) {
      onChangeSort();
      return;
    }
    if (typeData && data) {
      const newData = {
        ...data,
        [typeParameter]: single ? newOptions[0] : newOptions,
      };
      onChangeOption(typeData, newData);
    } else {
      onChangeOption(typeParameter, single ? newOptions[0] : newOptions);
    }
  };

  return (
    <div
      className={`${styles.filter__wrapper} ${isRow ? styles.wrapper__row : styles.wrapper}`}
    >
      {screen >= BREAKPOINT.MD ? (
        <div className={styles.left}>
          <p>{allText?.title}:</p>
        </div>
      ) : (
        <></>
      )}
      <MultiSelect
        options={options}
        onValueChange={handleMultiOptionsChange}
        defaultValue={defaultValue}
        // placeholder={allText?.default_value}
        disabled={disabled}
        single={single}
        showButtonClear={showButtonClear}
        showListClear={showListClear}
        showCheckBox={showCheckBox}
        hideText={hideText}
        className="!p-2"
      />
    </div>
  );
};
