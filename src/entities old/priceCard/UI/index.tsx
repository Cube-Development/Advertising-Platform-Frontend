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
      <div className={styles.content}>
        <div className={styles.top}>
          <p className={styles.title}>{price.name}</p>
          <p className={styles.views}>{price.views}</p>
        </div>
        <div className={styles.price}>
          <p>{price.price}</p>
        </div>
        <div>
          {buyBtn}
          <p className={styles.text}>{price.info}</p>
        </div>
        <ul>
          {price.options.map((option, index) => (
            <li key={index}>
              {option.available ? <YesIcon /> : <NoIcon />}
              <p>{option.option}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
