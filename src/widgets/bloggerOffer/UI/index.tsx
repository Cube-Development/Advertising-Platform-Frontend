import { AcceptOffer } from "@features/acceptOffer";
import { AddPlatform } from "@features/addPlatform";
import { BloggerOfferCard } from "@features/bloggerOfferCard";
import { RejectOffer } from "@features/rejectOffer";
import { SeeLink } from "@features/seeLink";
import { SeeReason } from "@features/seeReason";
import { SendLink } from "@features/sendLink";
import { ZeroPlatform } from "@features/zeroPlatform";
import { pageFilter } from "@shared/config/pageFilter";
import { paths } from "@shared/routing";
import { IBloggerOffers } from "@shared/types/bloggerOffer";
import { FC } from "react";
import styles from "./styles.module.scss";

interface BloggerOfferProps {
  offers: IBloggerOffers;
}

export const BloggerOffer: FC<BloggerOfferProps> = ({ offers }) => {
  return (
    <div className="container sidebar">
      {offers?.orders.length === 0 ? (
        <ZeroPlatform
          AddPlatformBtn={AddPlatform}
          page={pageFilter.offer}
          path={paths.offers}
        />
      ) : (
        <div className={styles.wrapper}>
          {offers?.orders?.map((card, index) => (
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
        </div>
      )}
    </div>
  );
};
