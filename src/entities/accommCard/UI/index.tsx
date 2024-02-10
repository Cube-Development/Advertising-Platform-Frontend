import { FC, ReactElement } from "react";
import styles from "./styles.module.scss";
import { IAccomm } from "@shared/types/translate";
import { QualityIcon } from "@shared/assets/icons/quality";
import { ProtectIcon } from "@shared/assets/icons/protect";

interface AccommCardProps {
  accomm: IAccomm;
  toDoBtn: ReactElement,
}

export const AccommCard: FC<AccommCardProps> = ({ accomm, toDoBtn }) => {
  const subclass = accomm.type === "vencom" ? styles.vencom : "";

  return (
    <div className={`${styles.accomms} ${subclass}`}>
      <div className={styles.accomms__row}>
        {accomm.type === "vencom" && <QualityIcon/>}
        <h1 className={styles.title}>{accomm.title}</h1>
      </div>

      <ul>
        {accomm.stages.map((item, index) => (
          <li key={index}>
            {item.stage}
          </li>
        ))}
      </ul>

      {accomm.type === "vencom" && (
        <div className={styles.bottom__row}>
          {toDoBtn}
          <div className={styles.save__row}>
            <ProtectIcon />
            <p>{accomm.save}</p>
          </div>
        </div>
      )}
    </div>
  );
};
