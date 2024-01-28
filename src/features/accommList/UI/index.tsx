import { FC, ReactElement } from "react";
import styles from "./styles.module.scss";
import { IAccomm } from "@shared/types/translate";
import { AccommCard } from "@entities/accommCard";

interface AccommProps {
  accomms: IAccomm[];
  startAdvBtn: ReactElement,

}

export const AccommList: FC<AccommProps> = ({ accomms, startAdvBtn }) => {
  return (
    <div className={styles.why__row}>
      {accomms.map((accomm, index) => (
        <AccommCard key={index} accomm={accomm} startAdvBtn={startAdvBtn}/>
      ))}
    </div>
  );
};
