import { FC, ReactElement } from "react";
import styles from "./styles.module.scss";
import { IPrice } from "@shared/types/translate";
import { PriceCard } from "@entities/priceCard";

interface PriceListProps {
  tarifs: IPrice[];
  buyBtn: ReactElement;
}

export const PriceList: FC<PriceListProps> = ({ tarifs, buyBtn }) => {
  return (
    <div className={styles.tarifs}>
      {tarifs.map((tarif, index) => (
        <PriceCard key={index} price={tarif} index={index} buyBtn={buyBtn} />
      ))}
    </div>
  );
};
