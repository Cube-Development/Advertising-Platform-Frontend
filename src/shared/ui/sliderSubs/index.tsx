import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss"; // Подключаем файл со стилями
import { MySliderLimit } from "../sliderLimit";

interface SliderSubsProps {
  onUserCountChange: (userCount: number) => void;
}

export const SliderSubs: FC<SliderSubsProps> = ({ onUserCountChange }) => {
  const [value, setValue] = useState<number>(1000);
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    onUserCountChange(newValue);
  };

  return (
    <div className={styles.slider__wrapper}>
      <div className={styles.slider__row}>
        <p className={styles.title}>{t(`main_page_blogger.card.subs`)}</p>
        <p className={styles.value}>{value.toLocaleString()}</p>
      </div>
      <MySliderLimit
        type="range"
        min={1000}
        max={10000000}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
