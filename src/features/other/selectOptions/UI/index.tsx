import { IOption, ISelectOption } from "@shared/types";
import { InfoTooltip, MultiSelect, MultiSelectProps } from "@shared/ui";
import { FC } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface SelectOptionsProps extends MultiSelectProps {
  textData: string;
  options: IOption[];
  type: any;
  isRow?: boolean;
  isCatalog?: boolean;
  onChangeOption: UseFormSetValue<any>;
  formState: any;
  isDisabled?: boolean;
}

export const SelectOptions: FC<SelectOptionsProps> = ({
  options,
  type,
  onChangeOption,
  single = false,
  showButtonClear = true,
  showListClear = true,
  showCheckBox = true,
  searchable = false,
  isRow,
  textData,
  isCatalog,
  formState,
  defaultValue,
  isDisabled = false,
}) => {
  const { t } = useTranslation();
  const allText = t(textData!, { returnObjects: true }) as ISelectOption;

  const handleMultiOptionsChange = (newOptions: (number | null)[]) => {
    if (isCatalog) {
      console.log("newOptions", newOptions);
      const updatedFilter = {
        ...formState?.filter,
        [type]: single ? newOptions[0] : newOptions,
      };
      onChangeOption("filter", updatedFilter);
    } else {
      onChangeOption(type, single ? newOptions[0] : newOptions);
    }
  };

  return (
    <>
      <div
        className={`${styles.parameters} ${isRow ? styles.wrapper__row : styles.wrapper}`}
      >
        <div className={styles.left}>
          <p>{allText?.title}</p>
          {allText?.text && <InfoTooltip text={allText?.text} />}
        </div>
      </div>
      <MultiSelect
        options={options}
        onValueChange={handleMultiOptionsChange}
        defaultValue={defaultValue}
        placeholder={allText?.default_value}
        disabled={isDisabled}
        single={single}
        showButtonClear={showButtonClear}
        showListClear={showListClear}
        showCheckBox={showCheckBox}
        searchable={searchable}
      />
    </>
  );
};
