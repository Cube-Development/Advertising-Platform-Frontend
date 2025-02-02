import { IOption, ISelectOption } from "@shared/types";
import { InfoTooltip, MultiSelect, MultiSelectProps } from "@shared/ui";
import { FC } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface SelectOptionsProps extends MultiSelectProps {
  textData: string;
  options: IOption[];
  isRow?: boolean;
  onChangeOption: UseFormSetValue<any>;
  data?: any;
  typeData?: string;
  typeParameter: string;
}

export const SelectOptions: FC<SelectOptionsProps> = ({
  options,
  data,
  typeData,
  typeParameter,
  onChangeOption,
  isRow,
  textData,
  defaultValue,
  single = false,
  showButtonClear = true,
  showListClear = true,
  showCheckBox = true,
  searchable = false,
  disabled = false,
}) => {
  const { t } = useTranslation();
  const allText = t(textData!, { returnObjects: true }) as ISelectOption;

  const handleMultiOptionsChange = (newOptions: (number | string)[]) => {
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
      className={`${styles.parameters} ${isRow ? styles.wrapper__row : styles.wrapper}`}
    >
      <div className={styles.left}>
        <p>{allText?.title}</p>
        {allText?.text && <InfoTooltip text={allText?.text} />}
      </div>
      <MultiSelect
        options={options}
        onValueChange={handleMultiOptionsChange}
        defaultValue={defaultValue}
        placeholder={allText?.default_value}
        disabled={disabled}
        single={single}
        showButtonClear={showButtonClear}
        showListClear={showListClear}
        showCheckBox={showCheckBox}
        searchable={searchable}
      />
    </div>
  );
};
