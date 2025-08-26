import { ProtectIcon, QualityIcon } from "@shared/assets";
import { IAcom } from "@shared/types/translate";
import { FC, ReactElement } from "react";
import styles from "./styles.module.scss";

interface AccommCardProps {
  accomm: IAcom;
  toDoBtn: ReactElement;
}

export const AccommCard: FC<AccommCardProps> = ({ accomm, toDoBtn }) => {
  const subclass = accomm.type === "vencom" ? styles.vencom : "";

  return (
    <div className={`${styles.wrapper} ${subclass}`}>
      <div className={styles.accomms}>
        <div className={styles.accomms__row}>
          {accomm.type === "vencom" && <QualityIcon />}
          <p className={styles.title}>{accomm.title}</p>
        </div>

        <ul>
          {accomm.stages.map((item, index) => (
            <li key={index}>{item.stage}</li>
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
    </div>
  );
};
