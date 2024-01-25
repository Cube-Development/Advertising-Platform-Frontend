import { FC } from "react";
import styles from "./styles.module.scss";
import { IPrice } from "@shared/types/language";
import { PriceCard } from "@entities/mainPage";

interface PriceListProps {
  tarifs: IPrice[];
}

export const PriceList: FC<PriceListProps> = ({ tarifs }) => {
  return (
    <div className={styles.tarifs}>
      {tarifs.map((tarif, index) => (
        <PriceCard key={index} price={tarif} index={index} />
      ))}
    </div>
  );
};
