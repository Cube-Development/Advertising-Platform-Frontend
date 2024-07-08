import { AcceptOffer } from "src/features old/acceptOffer";
import { AddPlatform } from "src/features old/addPlatform";
import { BloggerOfferCard } from "src/features old/bloggerOfferCard";
import { RejectOffer } from "src/features old/rejectOffer";
import { SeePost } from "src/features old/seeLink";
import { SeeReason } from "src/features old/seeReason";
import { SendLink } from "src/features old/sendLink";
import { FC } from "react";
import { IBloggerOfferCard } from "@shared/types/bloggerOffer";
import styles from "./styles.module.scss";
import { ZeroPlatform } from "src/features old/zeroPlatform";
import { pageFilter } from "@shared/config/pageFilter";
import { paths } from "@shared/routing";
import { SpinnerLoader } from "@shared/ui/spinnerLoader";
import { ShowMoreBtn } from "src/features old/showMore";
import { INTERSECTION_ELEMENTS } from "@shared/config/common";
import { SkeletonBloggerOfferCard } from "src/features old/bloggerOfferCard/skeletonBloggerOfferCard";

interface BloggerOfferProps {
  offers: IBloggerOfferCard[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isNotEmpty: boolean;
}

export const BloggerOffer: FC<BloggerOfferProps> = ({
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
                SeeLinkBtn={SeePost}
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
