import { AllChannelTypes, channelStatusFilter } from "@entities/channel";
import { offerStatusFilter } from "@entities/offer";
import { AddChannel, ZeroChannel } from "@features/channel";
import { INTERSECTION_ELEMENTS, PAGE_ANIMATION } from "@shared/config";
import { pageFilter } from "@shared/routing";
import { Accordion, ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { motion } from "framer-motion";
import { FC } from "react";
import { ChannelCard, ChannelCardSkeleton } from "../card";
import styles from "./styles.module.scss";

interface ActiveChannelsProps {
  cards: AllChannelTypes[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isLast: boolean;
  statusFilter: channelStatusFilter | offerStatusFilter | string;
}

export const ActiveChannels: FC<ActiveChannelsProps> = ({
  cards,
  isLast,
  isLoading,
  handleOnChangePage,
  statusFilter,
}) => {
  return (
    <Accordion type="single" collapsible className={styles.wrapper}>
      {!isLoading && cards?.length === 0 ? (
        <ZeroChannel
          statusFilter={statusFilter}
          AddChannelBtn={AddChannel}
          page={pageFilter.platform}
        />
      ) : (
        <div className={styles.cards}>
          {cards?.map((card, index) => (
            <motion.div
              key={card.id + index}
              initial="hidden"
              animate="visible"
              custom={index % INTERSECTION_ELEMENTS.myChannels}
              variants={PAGE_ANIMATION.animationUp}
            >
              <ChannelCard statusFilter={statusFilter} card={card} />
            </motion.div>
          ))}
          {isLoading &&
            Array.from({ length: INTERSECTION_ELEMENTS.myChannels }).map(
              (_, index) => <ChannelCardSkeleton key={index} />,
            )}
          {!isLast && (
            <div className={styles.show_more} onClick={handleOnChangePage}>
              {isLoading ? <SpinnerLoader /> : <ShowMoreBtn />}
            </div>
          )}
        </div>
      )}
    </Accordion>
  );
};
