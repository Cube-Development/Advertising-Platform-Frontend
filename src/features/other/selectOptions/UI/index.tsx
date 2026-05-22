import { IOption, ISelectOption } from "@shared/types";
import { InfoTooltip, MultiSelect, MultiSelectProps } from "@shared/ui";
import { X } from "lucide-react";
import { FC, useMemo } from "react";
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
  /** Компактные чипы выбранных значений (каталог) */
  showSelectedChips?: boolean;
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
  showSelectedChips = false,
}) => {
  const { t } = useTranslation();
  const allText = t(textData!, { returnObjects: true }) as ISelectOption;

  const selectedIds = useMemo(() => {
    if (defaultValue == null || defaultValue === "") return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  }, [defaultValue]);

  const selectedOptions = useMemo(
    () =>
      selectedIds
        .map((id) => options.find((opt) => opt.id === id))
        .filter((opt): opt is IOption => Boolean(opt)),
    [selectedIds, options],
  );

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

  const handleRemoveChip = (id: number) => {
    handleMultiOptionsChange(selectedIds.filter((value) => value !== id));
  };

  return (
    <div
      className={`${styles.parameters} ${isRow ? styles.wrapper__row : styles.wrapper}`}
    >
      <div className={styles.left}>
        <p>{allText?.title}</p>
        {allText?.text && <InfoTooltip text={allText?.text} />}
      </div>
      <div className={styles.field}>
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
        {showSelectedChips && selectedOptions.length > 0 && (
          <div className={styles.chips} role="list">
            {selectedOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className={styles.chip}
                role="listitem"
                title={option.name}
                aria-label={`${t("components.select.clear")}: ${option.name}`}
                onClick={() => handleRemoveChip(option.id)}
              >
                <span className={styles.chip__label}>{option.name}</span>
                <X size={10} strokeWidth={2.5} className={styles.chip__icon} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
