import { IAddChannelData } from "@entities/channel";
import { InfoTooltip, MySliderLimit } from "@shared/ui";
import { FC, useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface SelectSymbolProps {
  title: string;
  text: string;
  type: keyof IAddChannelData;
  onChange: UseFormSetValue<any>;
  defaultValues?: number;
  isRow?: boolean;
}

export const SelectSymbol: FC<SelectSymbolProps> = ({
  title,
  text,
  onChange,
  defaultValues,
  isRow,
}) => {
  const { t } = useTranslation();

  const min = 100;
  const max = 4096;

  const [position, setPosition] = useState(defaultValues || max);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPosition = parseInt(e.target.value);
    setPosition(newPosition);
    onChange("text_limit", newPosition);
  };

  useEffect(() => {
    if (defaultValues) {
      setPosition(defaultValues);
    }
  }, [defaultValues]);

  return (
    <div className={`${isRow ? styles.wrapper__row : styles.wrapper}`}>
      <div className={styles.title}>
        <p>{t(title)}</p>
        <InfoTooltip text={t(text)} />
      </div>
      <div className={styles.slider}>
        <p>{min}</p>
        <MySliderLimit
          type="range"
          min={min}
          max={max}
          value={position}
          onChange={handleChange}
        />
        <p>{position}</p>
      </div>
    </div>
  );
};
