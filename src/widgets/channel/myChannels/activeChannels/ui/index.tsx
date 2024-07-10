import { FC } from "react";
import { Accordion, ShowMoreBtn } from "@shared/ui";
import { SpinnerLoader } from "@shared/ui";
import { ChannelCard, ChannelCardSkeleton } from "../card";
import { AddChannel, ZeroChannel } from "@features/channel";
import styles from "./styles.module.scss";
import { AllChannelTypes } from "@entities/channel";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { pageFilter } from "@shared/routing";

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
