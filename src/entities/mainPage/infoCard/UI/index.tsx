import { FC } from "react";
import styles from "./styles.module.scss";
import { IBasicInfo } from "@shared/types/language";

interface InfoCardProps {
  info: IBasicInfo;
}

export const InfoCard: FC<InfoCardProps> = ({ info }) => {
  return (
    <div className={styles.info}>
      <img src={`/images/basicInfo/${info.img}`} alt="" />
      <h4 className={styles.count}>{info.count}</h4>
      <p className={styles.text}>{info.info}</p>
    </div>
  );
};
