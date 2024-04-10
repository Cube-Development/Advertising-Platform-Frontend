import { FC } from "react";
import styles from "./styles.module.scss";
import { IOption } from "@shared/types/translate";

interface OptionCardProps {
  option: IOption;
}

export const OptionCard: FC<OptionCardProps> = ({ option }) => {
  return (
    <div className={styles.option}>
      <img src={`/images/options/${option.img}`} alt="" />
      <h4>{option.option}</h4>
    </div>
  );
};
