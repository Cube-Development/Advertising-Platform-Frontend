import { FC, ReactElement } from "react";
import styles from "./styles.module.scss";
import { IPrice } from "@shared/types/translate";
import { YesIcon, NoIcon } from "@shared/assets";

interface PriceCardProps {
  price: IPrice;
  currentTarif: number;
  buyBtn: ReactElement;
  tarifType: number;
  onChange: (tarif: number) => void;
}

export const PriceCard: FC<PriceCardProps> = ({
  price,
  currentTarif,
  tarifType,
  buyBtn,
  onChange,
}) => {
  return (
    <div
      className={`${styles.price__card} ${currentTarif === tarifType ? styles.active : ""}`}
      onClick={() => onChange(tarifType)}
    >
      <p className={styles.title}>{price.name}</p>
      <p className={styles.views}>{price.views}</p>
      <p className={styles.price}>{price.price}</p>
      {buyBtn}
      <p className={styles.text}>{price.info}</p>
      <ul>
        {price.options.map((option, index) => (
          <li key={index}>
            {option.available ? <YesIcon /> : <NoIcon />}
            {option.option}
          </li>
        ))}
      </ul>
    </div>
  );
};
