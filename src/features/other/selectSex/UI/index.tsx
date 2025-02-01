import { PLATFORM_PARAMETERS } from "@entities/channel";
import { DEBOUNCE } from "@entities/project";
import { BoyIcon, GirlIcon } from "@shared/assets";
import { useDebounce } from "@shared/hooks";
import { InfoTooltip, MySliderSex } from "@shared/ui";
import { FC, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface SelectSexProps {
  title: string;
  text?: string;
  onChange: UseFormSetValue<any>;
  isRow?: boolean;
  isCatalog?: boolean;
  formState?: any;
  defaultValues?: number;
}

export const SelectSex: FC<SelectSexProps> = ({
  title,
  text,
  onChange,
  isRow,
  isCatalog,
  formState,
  defaultValues = PLATFORM_PARAMETERS.defaultSexMale,
}) => {
  const { t } = useTranslation();
  const [position, setPosition] = useState<number>(defaultValues);
  const debouncedPosition = useDebounce(position, DEBOUNCE.sex);

  const handleChange = (newPosition: number) => {
    if (isCatalog) {
      const updatedFilter = {
        ...formState?.filter,
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
    setPosition(defaultValues);
  }, [defaultValues]);

  useEffect(() => {
    handleChange(debouncedPosition as number);
  }, [debouncedPosition]);

  return (
    <div className={isRow ? styles.wrapper__row : styles.wrapper}>
      <div className={styles.title}>
        <p>{t(title)}</p>
        {text && <InfoTooltip text={t(text)} />}
      </div>
      <div className={`${styles.slider} ${isCatalog ? styles.isCatalog : ""}`}>
        <div className={styles.man}>
          <p>{position}%</p>
          <BoyIcon />
        </div>
        <MySliderSex
          type="range"
          min={0}
          step={5}
          max={100}
          value={position}
          onChange={(e) => setPosition(parseInt(e.target.value))}
        />
        <div className={styles.woman}>
          <GirlIcon />
          <p>{100 - position}%</p>
        </div>
      </div>
    </div>
  );
};
