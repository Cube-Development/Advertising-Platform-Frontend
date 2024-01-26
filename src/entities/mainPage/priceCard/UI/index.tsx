import { FC } from "react";
import styles from "./styles.module.scss";
import { IPrice } from "@shared/types/translate";
import { MyButton } from "@shared/ui";

interface PriceCardProps {
  price: IPrice;
  index: number;
}

export const PriceCard: FC<PriceCardProps> = ({ price, index }) => {
  const borderClass =
    index === 1 ? styles.standard : index === 2 ? styles.complex : "";

  return (
    <div className={`${styles.price__card} ${borderClass}`}>
      <h1 className={styles.title}>{price.name}</h1>
      <h2 className={styles.views}>{price.views}</h2>
      <h4 className={styles.price}>{price.price}</h4>
      <MyButton customClass={styles.button}>{price.btn}</MyButton>
      <p className={styles.text}>{price.info}</p>
      <ul className={styles.options}>
        {price.options.map((option) => (
          <div className={styles.option__row}>
            {option.available ? (
              <img src={`images/common/yes.svg`} alt="" />
            ) : (
              <img src={`images/common/no.svg`} alt="" />
            )}
            <li>{option.option}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};
