import { FC } from "react";
import styles from "./styles.module.scss";
import { IAccomm } from "@shared/types/language";
import { MyButton } from "@shared/ui";

interface AccommCardProps {
  accomm: IAccomm;
}

export const AccommCard: FC<AccommCardProps> = ({ accomm }) => {
  const subclass = accomm.type === "vencom" ? styles.vencom : "";

  return (
    <div className={`${styles.accomms} ${subclass}`}>
      <div className={styles.accomms__row}>
        {accomm.type === "vencom" && (
          <img src="images/common/quality.svg" alt="" />
        )}
        <h1 className={styles.title}>{accomm.title}</h1>
      </div>

      <ul>
        {accomm.stages.map((item, index) => (
          <li key={index} className={styles.accomm}>
            {item.stage}
          </li>
        ))}
      </ul>

      {accomm.type === "vencom" && (
        <div className={styles.bottom__row}>
          <MyButton customClass={styles.button}>{accomm.btn_start}</MyButton>
          <div className={styles.save__row}>
            <img src="images/common/protect.svg" alt="" />
            <h4>{accomm.save}</h4>
          </div>
        </div>
      )}
    </div>
  );
};
