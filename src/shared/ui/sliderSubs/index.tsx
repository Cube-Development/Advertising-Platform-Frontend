import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss"; // Подключаем файл со стилями

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
        <h2 className={styles.title}>{t(`main_page_blogger.card.subs`)}</h2>
        <h2 className={styles.value}>{value.toLocaleString()}</h2>
      </div>
      <input
        type="range"
        min={1000}
        max={10000000}
        value={value}
        onChange={handleChange}
        className={styles.slider}
      />
    </div>
  );
};
