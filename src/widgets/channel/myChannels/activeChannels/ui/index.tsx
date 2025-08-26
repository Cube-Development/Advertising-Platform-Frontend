import { AllChannelTypes, ENUM_CHANNEL_STATUS } from "@entities/channel";
import { ENUM_OFFER_STATUS } from "@entities/offer";
import { AddChannel, ZeroChannel } from "@features/channel";
import { INTERSECTION_ELEMENTS, PAGE_ANIMATION } from "@shared/config";
import { ENUM_PAGE_FILTER } from "@shared/routing";
import { ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { motion } from "framer-motion";
import { FC } from "react";
import { ChannelCard, ChannelCardSkeleton } from "../card";
import styles from "./styles.module.scss";

interface ActiveChannelsProps {
  cards: AllChannelTypes[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isLast: boolean;
  statusFilter: ENUM_CHANNEL_STATUS;
}

export const ActiveChannels: FC<ActiveChannelsProps> = ({
  cards,
  isLast,
  isLoading,
  handleOnChangePage,
  statusFilter,
}) => {
  return (
    <div className={styles.wrapper}>
      {!isLoading && cards?.length === 0 ? (
        <ZeroChannel
          statusFilter={statusFilter}
          AddChannelBtn={AddChannel}
          page={ENUM_PAGE_FILTER.PLATFORM}
        />
      ) : (
        <div className={styles.cards}>
          {cards?.map((card, index) => (
            <motion.div
              key={card.id + index}
              initial="hidden"
              animate="visible"
              custom={index % INTERSECTION_ELEMENTS.BLOGGER_CHANNELS}
              variants={PAGE_ANIMATION.animationUp}
            >
              <ChannelCard statusFilter={statusFilter} card={card} />
            </motion.div>
          ))}
          {isLoading &&
            Array.from({ length: INTERSECTION_ELEMENTS.BLOGGER_CHANNELS }).map(
              (_, index) => (
                <ChannelCardSkeleton key={index} statusFilter={statusFilter} />
              ),
            )}
          {!isLast && (
            <div className={styles.show_more} onClick={handleOnChangePage}>
              {isLoading ? <SpinnerLoader /> : <ShowMoreBtn />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
