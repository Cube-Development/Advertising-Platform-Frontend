import { FC } from "react";
import styles from "./styles.module.scss";
import { MoreIcon } from "@shared/assets";

interface ChannelCardMenuProps {
  id: string;
}

export const ChannelCardMenu: FC<ChannelCardMenuProps> = ({ id }) => {
  return (
    <div className={styles.wrapper}>
      <button>
        <MoreIcon className="icon__grey" />
      </button>
    </div>
  );
};
