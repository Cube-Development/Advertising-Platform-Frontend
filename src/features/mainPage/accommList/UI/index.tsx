import { FC } from "react";
import styles from "./styles.module.scss";
import { AccommCard } from "@entities/mainPage";
import { IAccomm } from "@shared/types/mainPage";

interface AccommProps {
  accomms: IAccomm[];
}

export const AccommList: FC<AccommProps> = ({ accomms }) => {
  return (
    <div className={styles.why__row}>
      {accomms.map((accomm, index) => (
        <AccommCard key={index} accomm={accomm} />
      ))}
    </div>
  );
};
