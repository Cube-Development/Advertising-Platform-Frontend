import { IBloggerOfferCard, offerStatusFilter } from "@entities/offer";
import { AddChannel, ZeroChannel } from "@features/channel";
import { INTERSECTION_ELEMENTS, PAGE_ANIMATION } from "@shared/config";
import { ENUM_PAGE_FILTER, ENUM_PATHS } from "@shared/routing";
import { ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { motion } from "framer-motion";
import { FC } from "react";
import { OfferCard, OfferCardSkeleton } from "../card";
import styles from "./styles.module.scss";

interface MyOffersProps {
  offers: IBloggerOfferCard[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isLast: boolean;
  statusFilter: offerStatusFilter;
}

export const MyOffers: FC<MyOffersProps> = ({
  offers,
  handleOnChangePage,
  isLoading,
  isLast,
  statusFilter,
}) => {
  return (
    <div className={styles.wrapper}>
      {!isLoading && offers?.length === 0 ? (
        <ZeroChannel
          AddChannelBtn={AddChannel}
          page={ENUM_PAGE_FILTER.OFFER}
          path={ENUM_PATHS.OFFERS}
          statusFilter={statusFilter}
        />
      ) : (
        <div>
          <div className={styles.cards}>
            {offers?.map((card, index) => (
              <motion.div
                key={card.id + index}
                initial="hidden"
                animate="visible"
                custom={index % INTERSECTION_ELEMENTS.BLOGGER_OFFERS}
                variants={PAGE_ANIMATION.animationUp}
              >
                <OfferCard statusFilter={statusFilter} card={card} />
              </motion.div>
            ))}
            {isLoading &&
              Array.from({ length: INTERSECTION_ELEMENTS.BLOGGER_OFFERS }).map(
                (_, index) => (
                  <OfferCardSkeleton key={index} statusFilter={statusFilter} />
                ),
              )}
            {!isLast && (
              <div className={styles.show_more} onClick={handleOnChangePage}>
                {isLoading ? <SpinnerLoader /> : <ShowMoreBtn />}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
