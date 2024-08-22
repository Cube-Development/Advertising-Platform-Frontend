import { NoIcon, YesIcon } from "@shared/assets";
import { ITarifInfo } from "@shared/types/translate";
import { FC, ReactElement } from "react";
import styles from "./styles.module.scss";

interface PriceCardProps {
  tarifInfo: ITarifInfo;
  BuyBtn: ReactElement;
  isActive: boolean;
}

export const PriceCard: FC<PriceCardProps> = ({
  tarifInfo,
  BuyBtn,
  isActive,
}) => {
  return (
    <div className={`${styles.price__card} ${isActive ? styles.active : ""}`}>
      <div className={styles.content}>
        <div className={`${styles.top} truncate`}>
          <p className={styles.title}>{tarifInfo.name}</p>
          <p className={`${styles.views} truncate`}>{tarifInfo.views}</p>
        </div>
        <div className={`${styles.price} truncate`}>
          <p className="truncate">{tarifInfo.price}</p>
        </div>
        <div className={styles.buy_tarif}>
          {BuyBtn}
          <p className={styles.text}>{tarifInfo.info}</p>
        </div>
        <ul>
          {tarifInfo.options.map((option, index) => (
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
