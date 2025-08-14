import {
  ENUM_INVOICE_TYPE,
  IBloggerOfferCard,
  offerStatusFilter,
} from "@entities/offer";
import { offerOpen } from "@entities/user";
import { AddChannel, ZeroChannel } from "@features/channel";
import { SignOrder } from "@features/documents";
import { LoginModal } from "@features/organization";
import { INTERSECTION_ELEMENTS, PAGE_ANIMATION } from "@shared/config";
import { useAppDispatch, useAppSelector } from "@shared/hooks";
import { ENUM_PAGE_FILTER, ENUM_PATHS } from "@shared/routing";
import { ShowMoreBtn, SpinnerLoader } from "@shared/ui";
import { getAnimationDelay } from "@shared/utils";
import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";
import { OfferCard, OfferCardSkeleton } from "../card";
import styles from "./styles.module.scss";

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
  const { isAuthEcp, isOfferSign } = useAppSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleSign = async () => {
    if (!isAuthEcp) {
      setIsModalOpen(true);
      return;
    } else if (!isOfferSign) {
      dispatch(offerOpen(true));
      return;
    }
  };

  useEffect(() => {
    if (isAuthEcp) {
      setIsModalOpen(false);
    }
  }, [isAuthEcp]);

  return (
    <div className={styles.wrapper}>
      <LoginModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        haveTrigger={false}
      />
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
                    <SignOrder
                      docType={ENUM_INVOICE_TYPE.ACT}
                      orderId={card.id}
                      onSigned={handleSign}
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
