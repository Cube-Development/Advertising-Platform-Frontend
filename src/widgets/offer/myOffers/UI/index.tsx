import { FC } from "react";
import styles from "./styles.module.scss";
import { pageFilter } from "@shared/config/pageFilter";
import { paths } from "@shared/routing";
import { INTERSECTION_ELEMENTS } from "@shared/config/common";
import { OfferCard, OfferCardSkeleton } from "../card";
import { ShowMoreBtn, ZeroChannel, SpinnerLoader } from "@shared/ui";
import { AddChannel } from "@features/channel";
import { IBloggerOfferCard } from "@entities/offer";

interface MyOffersProps {
  offers: IBloggerOfferCard[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isNotEmpty: boolean;
}

export const MyOffers: FC<MyOffersProps> = ({
  offers,
  handleOnChangePage,
  isLoading,
  isNotEmpty,
}) => {
  return (
    <div className="container sidebar">
      {!isLoading && offers?.length === 0 ? (
        <ZeroChannel
          AddChannelBtn={AddChannel}
          page={pageFilter.offer}
          path={paths.offers}
        />
      ) : (
        <div className={styles.wrapper}>
          {isLoading &&
            Array.from({ length: INTERSECTION_ELEMENTS.offers }).map(
              (_, index) => <OfferCardSkeleton key={index} />,
            )}
          {!isLoading &&
            offers?.map((card, index) => <OfferCard key={index} card={card} />)}
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
