import { IAdminComplaintData } from "@entities/admin";
import { FC } from "react";
import { ComplaintCard } from "../card";
import styles from "./styles.module.scss";

interface ComplaintsListProps {
  complaints: IAdminComplaintData[];
}

export const ComplaintsList: FC<ComplaintsListProps> = ({ complaints }) => {
  return (
    <div className={styles.wrapper}>
      {complaints?.length ? (
        <div className={styles.cards}>
          {complaints.map((card, index) => (
            <div key={index}>
              <ComplaintCard card={card} />
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
