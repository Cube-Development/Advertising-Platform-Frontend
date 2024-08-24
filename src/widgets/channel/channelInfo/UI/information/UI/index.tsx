import {
  Description,
  IChannelStatistics,
  IReadChannelData,
  Parameters,
  SkeletonChannelDescription,
  SkeletonChannelParameters,
  SkeletonChannelStatistics,
  Statistics,
} from "@entities/channel";
import { PAGE_ANIMATION } from "@shared/config";
import { motion } from "framer-motion";
import { FC } from "react";
import { Reviews } from "../reviews";
import styles from "./styles.module.scss";

interface InformationProps {
  card: IReadChannelData;
  statistics: IChannelStatistics;
  isLoading: boolean;
}

export const Information: FC<InformationProps> = ({
  card,
  statistics,
  isLoading,
}) => {
  let custom = 0;
  return (
    <motion.div className={styles.wrapper} initial="hidden" animate="visible">
      <div className={styles.info}>
        {!isLoading ? (
          <>
            <motion.div
              custom={custom++}
              variants={PAGE_ANIMATION.animationLeft}
            >
              <Description card={card} />
            </motion.div>
            <motion.div
              custom={custom++}
              variants={PAGE_ANIMATION.animationLeft}
            >
              <Parameters card={card} />
            </motion.div>
          </>
        ) : (
          <>
            <SkeletonChannelDescription />
            <SkeletonChannelParameters />
          </>
        )}
      </div>
      <div>
        {!isLoading ? (
          <motion.div custom={custom++} variants={PAGE_ANIMATION.animationLeft}>
            <Statistics statistics={statistics} />
          </motion.div>
        ) : (
          <SkeletonChannelStatistics />
        )}
      </div>

      <Reviews isLoadingReviews={isLoading} />
    </motion.div>
  );
};
