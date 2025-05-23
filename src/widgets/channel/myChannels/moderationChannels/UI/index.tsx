import { IModerationChannel, channelStatusFilter } from "@entities/channel";
import { offerStatusFilter } from "@entities/offer";
import { AddChannel, ZeroChannel } from "@features/channel";
import { INTERSECTION_ELEMENTS, PAGE_ANIMATION } from "@shared/config";
import { ENUM_PAGE_FILTER } from "@shared/routing";
import { ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { motion } from "framer-motion";
import { FC } from "react";
import styles from "./styles.module.scss";
import { ModChannelCard, ModChannelCardSkeleton } from "../card";

interface ModerationChannelsProps {
  cards: IModerationChannel[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isLast: boolean;
  statusFilter: channelStatusFilter | offerStatusFilter | string;
}

export const ModerationChannels: FC<ModerationChannelsProps> = ({
  cards,
  handleOnChangePage,
  isLoading,
  isLast,
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
          {cards?.map((card, index: number) => (
            <motion.div
              key={card.id + index}
              initial="hidden"
              animate="visible"
              custom={index % INTERSECTION_ELEMENTS.BLOGGER_MODERATION_CHANNELS}
              variants={PAGE_ANIMATION.animationUp}
            >
              <ModChannelCard key={index} card={card} />
            </motion.div>
          ))}
          {isLoading &&
            Array.from({
              length: INTERSECTION_ELEMENTS.BLOGGER_MODERATION_CHANNELS,
            }).map((_, index) => <ModChannelCardSkeleton key={index} />)}
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
