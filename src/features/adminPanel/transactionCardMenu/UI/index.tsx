import { FC } from "react";
import styles from "./styles.module.scss";
import { MoreIcon } from "@shared/assets";

interface TransactionCardMenuProps {
  id: string;
}

export const TransactionCardMenu: FC<TransactionCardMenuProps> = ({ id }) => {
  return (
    <div className={styles.wrapper}>
      <button>
        <MoreIcon className="icon__grey" />
      </button>
    </div>
  );
};
