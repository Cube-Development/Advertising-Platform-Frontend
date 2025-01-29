import { PLATFORM_PARAMETERS } from "@entities/channel";
import { DEBOUNCE } from "@entities/project";
import { BoyIcon, GirlIcon } from "@shared/assets";
import { useDebounce } from "@shared/hooks";
import { InfoTooltip, MySliderSex } from "@shared/ui";
import { FC, useEffect, useState } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

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

  const [position, setPosition] = useState<number | null>(
    defaultValues !== undefined
      ? defaultValues
      : isCatalog
        ? null
        : PLATFORM_PARAMETERS.defaultSexMale,
  );

  const debouncedPosition = useDebounce(position, DEBOUNCE.sex);

  const handleChange = (newPosition: number | null) => {
    if (isCatalog) {
      const { filter } = getValues && getValues();
      const updatedFilter = {
        ...filter,
        ["male"]: newPosition,
        ["female"]: newPosition ? 100 - newPosition : null,
      };
      onChange("filter", updatedFilter);
    } else {
      onChange("male", newPosition);
      onChange("female", newPosition ? 100 - newPosition : null);
    }
  };

  useEffect(() => {
    if (isCatalog) {
      setPosition(defaultValues !== undefined ? defaultValues : null);
    } else {
      setPosition(
        defaultValues !== undefined
          ? defaultValues
          : PLATFORM_PARAMETERS.defaultSexMale,
      );
    }
  }, [defaultValues]);

  useEffect(() => {
    handleChange(debouncedPosition as number | null);
  }, [debouncedPosition]);

  return (
    <div className={isRow ? styles.wrapper__row : styles.wrapper}>
      <div className={styles.title}>
        <p>{t(title)}</p>
        {text && <InfoTooltip text={t(text)} />}
      </div>
      <div className={`${styles.slider} ${isCatalog ? styles.isCatalog : ""}`}>
        <div className={styles.man}>
          <p>{position ? position : PLATFORM_PARAMETERS.defaultSexMale}%</p>
          <BoyIcon />
        </div>
        <MySliderSex
          type="range"
          min={0}
          step={5}
          max={100}
          value={position ? position : PLATFORM_PARAMETERS.defaultSexMale}
          onChange={(e) => (
            setPosition(parseInt(e.target.value)), console.log(e.target.value)
          )}
        />
        <div className={styles.woman}>
          <GirlIcon />
          <p>
            {position ? 100 - position : PLATFORM_PARAMETERS.defaultSexMale}%
          </p>
        </div>
      </div>
    </div>
  );
};
