import {
  Description,
  IChannelStatistics,
  IReadChannelData,
  Parameters,
  Statistics,
} from "@entities/channel";
import { FC } from "react";
import { Reviews } from "../reviews";
import styles from "./styles.module.scss";

interface InformationProps {
  card: IReadChannelData;
}

export const Information: FC<InformationProps> = ({ card }) => {
  const statistics: IChannelStatistics = {
    orders: 1034,
    subs: 3500554,
    views: 22232,
    posts: 8,
    er: 15.4,
    cpv: 1000,
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <Description card={card} />
        <Parameters card={card} />
      </div>
      <Statistics statistics={statistics} />
      <Reviews />
    </div>
  );
};
