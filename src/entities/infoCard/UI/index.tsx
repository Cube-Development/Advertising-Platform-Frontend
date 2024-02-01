import { FC } from "react";
import styles from "./styles.module.scss";
import { IBasicInfo } from "@shared/types/translate";
import { Counter } from "@shared/ui/counter";

interface InfoCardProps {
  info: IBasicInfo;
}

export const InfoCard: FC<InfoCardProps> = ({ info }) => {
  return (
    <div className={styles.info}>
      <img src={`/images/basicInfo/${info.img}`} alt="" />
      <h4 className={styles.count}>
        <Counter  val={info.count} time={2}/>
      </h4>
      <p className={styles.text}>{info.info}</p>
    </div>
  );
};
