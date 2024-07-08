import { FC } from "react";
import { pageFilter } from "@shared/config/pageFilter";
import { Accordion } from "@shared/ui";
import { AllChannelTypes } from "@shared/types/channelStatus";
import { SpinnerLoader } from "@shared/ui";
import { INTERSECTION_ELEMENTS } from "@shared/config/common";
import { ChannelCard, ChannelCardSkeleton } from "../card";
import { ShowMoreBtn, ZeroChannel } from "@shared/ui";
import { AddChannel } from "@features/channel";
import styles from "./styles.module.scss";

interface ActiveChannelsProps {
  cards: AllChannelTypes[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isNotEmpty: boolean;
}

export const ActiveChannels: FC<ActiveChannelsProps> = ({
  cards,
  isNotEmpty,
  isLoading,
  handleOnChangePage,
}) => {
  return (
    <section className="container sidebar">
      {!isLoading && cards?.length === 0 ? (
        <ZeroChannel AddChannelBtn={AddChannel} page={pageFilter.platform} />
      ) : (
        <Accordion type="single" collapsible>
          <div className={styles.wrapper}>
            {isLoading &&
              Array.from({ length: INTERSECTION_ELEMENTS.platforms }).map(
                (_, index) => <ChannelCardSkeleton key={index} />,
              )}
            {!isLoading &&
              cards?.map((card) => <ChannelCard key={card.id} card={card} />)}
            {isNotEmpty && (
              <div className={styles.show_more} onClick={handleOnChangePage}>
                {isLoading ? <SpinnerLoader /> : <ShowMoreBtn />}
              </div>
            )}
          </div>
        </Accordion>
      )}
    </section>
  );
};
