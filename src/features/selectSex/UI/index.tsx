import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { InfoIcon } from "@shared/assets";
import { MySlider } from "@shared/ui/slider";
import { IAddPLatformData } from "@shared/types/common";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

interface SelectSexProps {
  title: string;
  text?: string;
  onChange: UseFormSetValue<any>;
  isRow?: boolean;
}

export const SelectSex: FC<SelectSexProps> = ({
  title,
  text,
  onChange,
  isRow,
}) => {
  const { t } = useTranslation();

  const [position, setPosition] = useState(50);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPosition = parseInt(e.target.value);
    setPosition(newPosition);
    onChange("male", newPosition);
    onChange("female", 100 - newPosition);
  };

  return (
    <div className={isRow ? styles.wrapper__row : styles.wrapper}>
      <div className={styles.title}>
        <p>{t(title)}</p>
        {text && <InfoIcon />}
      </div>
      <div className={styles.slider}>
        <MySlider
          type="range"
          min={0}
          step={5}
          max={100}
          value={position}
          onChange={handleChange}
        />
        <div className={styles.position}>
          <p>{100 - position} %</p>
          <p>{position} %</p>
        </div>
      </div>
    </div>
  );
};
