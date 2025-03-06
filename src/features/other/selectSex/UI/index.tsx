import { PLATFORM_PARAMETERS } from "@entities/channel";
import { DEBOUNCE } from "@entities/project";
import { BoyIcon, GirlIcon } from "@shared/assets";
import { useDebounce } from "@shared/hooks";
import { CustomCheckbox, InfoTooltip, MySliderSex } from "@shared/ui";
import { FC, useEffect, useRef, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface SelectSexProps {
  title: string;
  text?: string;
  onChange: UseFormSetValue<any>;
  isRow?: boolean;
  iconsAboveSlider?: boolean;
  formState?: any;
  defaultValues?: number;
  data?: any;
  typeData?: string;
  typeMan: string;
  typeWoman: string;
  showResetCheckbox?: boolean;
}

export const SelectSex: FC<SelectSexProps> = ({
  title,
  text,
  onChange,
  isRow,
  iconsAboveSlider,
  data,
  typeData,
  typeMan,
  typeWoman,
  defaultValues,
  showResetCheckbox = false,
}) => {
  const { t } = useTranslation();
  const isResetting = useRef(false);
  const isFirstRender = useRef(true);
  const [position, setPosition] = useState<number>(
    defaultValues || PLATFORM_PARAMETERS.defaultSexMale,
  );
  const debouncedPosition = useDebounce(position, DEBOUNCE.sex);

  const handleChange = (newPosition: number) => {
    if (typeData && data) {
      const newData = {
        ...data,
        [typeMan]: newPosition,
        [typeWoman]: 100 - newPosition,
      };
      onChange(typeData, newData);
    } else {
      onChange(typeMan, newPosition);
      onChange(typeWoman, 100 - newPosition);
    }
  };

  const handleRemoveSex = (isSelected: boolean) => {
    if (isSelected) {
      handleChange(PLATFORM_PARAMETERS.defaultSexMale);
    } else {
      isResetting.current = true;
      setPosition(PLATFORM_PARAMETERS.defaultSexMale);
      if (typeData && data) {
        const newData = {
          ...data,
          [typeMan]: undefined,
          [typeWoman]: undefined,
        };
        onChange(typeData, newData);
      } else {
        onChange(typeMan, undefined);
        onChange(typeWoman, undefined);
      }
    }
  };

  useEffect(() => {
    if (defaultValues) {
      setPosition(defaultValues);
    }
  }, [defaultValues]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (
      !isResetting.current &&
      // defaultValues &&
      defaultValues !== debouncedPosition
    ) {
      handleChange(debouncedPosition as number);
    }
    isResetting.current = false;
  }, [debouncedPosition]);

  return (
    <div className={isRow ? styles.wrapper__row : styles.wrapper}>
      <div className={styles.title}>
        <p>{t(title)}</p>
        {showResetCheckbox && (
          <CustomCheckbox
            isSelected={!!defaultValues}
            handleChangeSelected={handleRemoveSex}
          />
        )}
        {text && <InfoTooltip text={t(text)} />}
      </div>
      <div
        className={`${styles.slider} ${iconsAboveSlider ? styles.iconsAboveSlider : ""}`}
      >
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
