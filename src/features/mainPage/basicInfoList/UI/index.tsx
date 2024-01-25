import { FC } from "react";
import styles from "./styles.module.scss";
import { IBasicInfo } from "@shared/types/language";
import { InfoCard } from "@entities/mainPage";

interface BasicInfoProps {
  infos: IBasicInfo[];
}

export const BasicInfoList: FC<BasicInfoProps> = ({ infos }) => {
  return (
    <div className={styles.infos}>
      {infos.map((info, index) => (
        <InfoCard key={index} info={info} />
      ))}
    </div>
  );
};
