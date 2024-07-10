import { InfoIcon } from "@shared/assets";
import { FC, useEffect, useState } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { MySliderSex } from "@shared/ui";
import { PLATFORM_PARAMETERS } from "@entities/channel";
import { DEBOUNCE } from "@entities/catalog";
import { useDebounce } from "@shared/hooks";

interface SelectSexProps {
  title: string;
  text?: string;
  onChange: UseFormSetValue<any>;
  isRow?: boolean;
  isCatalog?: boolean;
  getValues?: UseFormGetValues<any>;
  defaultValues?: number;
}

export const SelectSex: FC<SelectSexProps> = ({
  title,
  text,
  onChange,
  isRow,
  isCatalog,
  getValues,
  defaultValues,
}) => {
  const { t } = useTranslation();

  const [position, setPosition] = useState<number>(
    defaultValues !== undefined
      ? defaultValues
      : PLATFORM_PARAMETERS.defaultSexMale,
  );
  const debouncedPosition = useDebounce(position, DEBOUNCE.sex);

  const handleChange = (newPosition: number) => {
    if (isCatalog) {
      const { filter } = getValues && getValues();
      const updatedFilter = {
        ...filter,
        ["male"]: newPosition,
        ["female"]: 100 - newPosition,
      };
      onChange("filter", updatedFilter);
    } else {
      onChange("male", newPosition);
      onChange("female", 100 - newPosition);
    }
  };

  useEffect(() => {
    setPosition(
      defaultValues !== undefined
        ? defaultValues
        : PLATFORM_PARAMETERS.defaultSexMale,
    );
  }, [defaultValues]);

  useEffect(() => {
    handleChange(debouncedPosition as number);
  }, [debouncedPosition]);

  return (
    <div className={isRow ? styles.wrapper__row : styles.wrapper}>
      <div className={styles.title}>
        <p>{t(title)}</p>
        {text && <InfoIcon />}
      </div>
      <div className={styles.slider}>
        <p className={styles.man}>{100 - position}%</p>
        <MySliderSex
          type="range"
          min={0}
          step={5}
          max={100}
          value={position}
          onChange={(e) => setPosition(parseInt(e.target.value))}
        />
        <p className={styles.woman}>{position}%</p>
      </div>
    </div>
  );
};
