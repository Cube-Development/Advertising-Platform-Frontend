import { IBasicInfo } from "@shared/types/translate";
import { Counter } from "@shared/ui/counter";
import { FC } from "react";
import styles from "./styles.module.scss";

interface InfoCardProps {
  info: IBasicInfo;
}

export const InfoCard: FC<InfoCardProps> = ({ info }) => {
  return (
    <div className={styles.info}>
      <img src={`/images/basicInfo/${info.img}`} alt="" />
      <p className={styles.count}>
        <Counter val={info.count} time={2} />
      </p>
      <span className={styles.text}>{info.info}</span>
    </div>
  );
};
