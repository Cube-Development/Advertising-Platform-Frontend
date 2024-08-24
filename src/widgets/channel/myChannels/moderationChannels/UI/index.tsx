import {
  IModerationChannel,
  ModChannelCard,
  ModChannelCardSkeleton,
  channelStatusFilter,
} from "@entities/channel";
import { offerStatusFilter } from "@entities/offer";
import { AddChannel, ZeroChannel } from "@features/channel";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { pageFilter } from "@shared/routing";
import { ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { FC } from "react";
import styles from "./styles.module.scss";

interface ModerationChannelsProps {
  cards: IModerationChannel[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isNotEmpty: boolean;
  statusFilter: channelStatusFilter | offerStatusFilter | string;
}

export const ModerationChannels: FC<ModerationChannelsProps> = ({
  cards,
  handleOnChangePage,
  isLoading,
  isNotEmpty,
  statusFilter,
}) => {
  return (
    <section className="container sidebar">
      {!isLoading && cards?.length === 0 ? (
        <ZeroChannel
          statusFilter={statusFilter}
          AddChannelBtn={AddChannel}
          page={pageFilter.platform}
        />
      ) : (
        <div className={styles.wrapper}>
          {isLoading &&
            Array.from({ length: INTERSECTION_ELEMENTS.modPlatforms }).map(
              (_, index) => <ModChannelCardSkeleton key={index} />,
            )}
          {!isLoading &&
            cards?.map((card, index: number) => (
              <ModChannelCard key={index} card={card} />
            ))}
          {isNotEmpty && (
            <div className={styles.show_more} onClick={handleOnChangePage}>
              {isLoading ? <SpinnerLoader /> : <ShowMoreBtn />}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
