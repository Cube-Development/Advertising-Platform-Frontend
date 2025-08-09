import { IBloggerOfferCard, offerStatusFilter } from "@entities/offer";
import { AddChannel, ZeroChannel } from "@features/channel";
import { INTERSECTION_ELEMENTS, PAGE_ANIMATION } from "@shared/config";
import { ENUM_PAGE_FILTER, ENUM_PATHS } from "@shared/routing";
import { ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { motion } from "framer-motion";
import { FC, useMemo } from "react";
import { OfferCard, OfferCardSkeleton } from "../card";
import styles from "./styles.module.scss";
import { getAnimationDelay } from "@shared/utils";
import { SignDocument } from "@features/documents";
import { OfferSign } from "@features/offer";
import { useAppSelector } from "@shared/hooks";
import {
  ENUM_ORGANIZATION_STATUS,
  useGetOrganizationQuery,
} from "@entities/organization";

interface MyOffersProps {
  offers: IBloggerOfferCard[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isLast: boolean;
  statusFilter: offerStatusFilter;
  currentPage: number;
}

export const MyOffers: FC<MyOffersProps> = ({
  offers,
  handleOnChangePage,
  isLoading,
  isLast,
  statusFilter,
  currentPage,
}) => {
  const { isAuthEcp } = useAppSelector((state) => state.user);
  const { data: organization } = useGetOrganizationQuery();

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
                key={card.id}
                initial="hidden"
                animate="visible"
                custom={getAnimationDelay({
                  index,
                  currentPage,
                  total: offers.length,
                  elements: INTERSECTION_ELEMENTS.BLOGGER_OFFERS,
                })}
                variants={PAGE_ANIMATION.animationUp}
              >
                <OfferCard
                  statusFilter={statusFilter}
                  card={card}
                  sign={
                    <OfferSign
                      documentId={card?.id || ""}
                      isAuthEcp={isAuthEcp}
                    />
                  }
                />
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
