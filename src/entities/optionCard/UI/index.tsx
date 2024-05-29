import { IOption } from "@shared/types/translate";
import { FC } from "react";
import styles from "./styles.module.scss";

interface OptionCardProps {
  option: IOption;
}

export const OptionCard: FC<OptionCardProps> = ({ option }) => {
  return (
    <div className={styles.option}>
      <img src={`/images/options/${option.img}`} alt="" />
      <p>{option.option}</p>
    </div>
  );
};
