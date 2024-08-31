import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { InfoIcon } from "@shared/assets";
import { UseFormSetValue } from "react-hook-form";
import { MySliderLimit } from "@shared/ui";
import { IAddChannelData } from "@entities/channel";

interface SelectSymbolProps {
  title: string;
  text: string;
  type: keyof IAddChannelData;
  onChange: UseFormSetValue<any>;
  defaultValues?: number;
}

export const SelectSymbol: FC<SelectSymbolProps> = ({
  title,
  text,
  onChange,
  defaultValues,
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <p>{t(title)}</p>
        <InfoIcon />
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
