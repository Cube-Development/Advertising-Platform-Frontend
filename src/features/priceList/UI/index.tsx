import { FC, ReactElement, useState } from "react";
import styles from "./styles.module.scss";
import { IPrice } from "@shared/types/translate";
import { PriceCard } from "@entities/priceCard";

interface PriceListProps {
  tarifs: IPrice[];
  buyBtn: ReactElement;
}

export const PriceList: FC<PriceListProps> = ({ tarifs, buyBtn }) => {
  const [currentTarif, setTarif] = useState<number>(1);

  const handleChangeTarif = (tarifType: number) => {
    console.log(tarifType);
    setTarif(tarifType);
  };

  return (
    <div className={styles.tarifs}>
      {tarifs.map((price, index) => (
        <PriceCard
          key={index}
          price={price}
          buyBtn={buyBtn}
          tarifType={index}
          currentTarif={currentTarif}
          onChange={handleChangeTarif}
        />
      ))}
    </div>
  );
};
