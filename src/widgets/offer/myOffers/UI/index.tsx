import { AcceptOffer } from "@features/acceptOffer";
import { AddPlatform } from "@features/addPlatform";
import { BloggerOfferCard } from "@features/bloggerOfferCard";
import { RejectOffer } from "@features/rejectOffer";
import { SeeLink } from "@features/seeLink";
import { SeeReason } from "@features/seeReason";
import { SendLink } from "@features/sendLink";
import { FC } from "react";
import { IBloggerOfferCard } from "@shared/types/bloggerOffer";
import styles from "./styles.module.scss";
import { ZeroPlatform } from "@features/zeroPlatform";
import { pageFilter } from "@shared/config/pageFilter";
import { paths } from "@shared/routing";
import { SpinnerLoader } from "@shared/ui/spinnerLoader";
import { ShowMoreBtn } from "@features/showMore";
import { INTERSECTION_ELEMENTS } from "@shared/config/common";
import { SkeletonBloggerOfferCard } from "@features/bloggerOfferCard/skeletonBloggerOfferCard";

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
        <ZeroPlatform
          AddPlatformBtn={AddPlatform}
          page={pageFilter.offer}
          path={paths.offers}
        />
      ) : (
        <div className={styles.wrapper}>
          {isLoading &&
            Array.from({ length: INTERSECTION_ELEMENTS.offers }).map(
              (_, index) => <SkeletonBloggerOfferCard key={index} />,
            )}
          {!isLoading &&
            offers?.map((card, index) => (
              <BloggerOfferCard
                key={index}
                card={card}
                SeeLinkBtn={SeeLink}
                SendLinkBtn={SendLink}
                AcceptOfferBtn={AcceptOffer}
                RejectOfferBtn={RejectOffer}
                SeeReasonBtn={SeeReason}
              />
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
