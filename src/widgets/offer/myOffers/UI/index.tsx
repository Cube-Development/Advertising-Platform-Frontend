import { FC } from "react";
import styles from "./styles.module.scss";
import { pageFilter, paths } from "@shared/routing";
import { OfferCard, OfferCardSkeleton } from "../card";
import { ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { AddChannel, ZeroChannel } from "@features/channel";
import { IBloggerOfferCard, offerStatusFilter } from "@entities/offer";
import { INTERSECTION_ELEMENTS } from "@shared/config";
import { channelStatusFilter } from "@entities/channel";

interface MyOffersProps {
  offers: IBloggerOfferCard[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isNotEmpty: boolean;
  statusFilter: channelStatusFilter | offerStatusFilter | string;
}

export const MyOffers: FC<MyOffersProps> = ({
  offers,
  handleOnChangePage,
  isLoading,
  isNotEmpty,
  statusFilter,
}) => {
  return (
    <div className="container sidebar">
      {!isLoading && offers?.length === 0 ? (
        <ZeroChannel
          AddChannelBtn={AddChannel}
          page={pageFilter.offer}
          path={paths.offers}
          statusFilter={statusFilter}
        />
      ) : (
        <div className={styles.wrapper}>
          {isLoading &&
            Array.from({ length: INTERSECTION_ELEMENTS.offers }).map(
              (_, index) => <OfferCardSkeleton key={index} />,
            )}
          {!isLoading &&
            offers?.map((card, index) => (
              <OfferCard statusFilter={statusFilter} key={index} card={card} />
            ))}
          {isNotEmpty && (
            <div className={styles.show_more} onClick={handleOnChangePage}>
              {isLoading ? <SpinnerLoader /> : <ShowMoreBtn />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
