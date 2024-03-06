import { ActivatePlatform } from "@features/activatePlatform";
import { AddPlatform } from "@features/addPlatform";
import { BloggerPlatformCard } from "@features/bloggerPlatformCard";
import { RepeatOffer } from "@features/repeatOffer";
import { SeeOffers } from "@features/seeOffers";
import { SeeReason } from "@features/seeReason";
import { Support } from "@features/support";
import { ZeroPlatform } from "@features/zeroPlatform";
import { IBloggerPlatformCard } from "@shared/types/common";
import { FC } from "react";
import styles from "./styles.module.scss";

interface BloggerPlatformProps {
  cards: IBloggerPlatformCard[];
}

export const BloggerPlatform: FC<BloggerPlatformProps> = ({ cards }) => {
  return (
    <div className="container sidebar">
      {cards.length === 0 ? (
        <ZeroPlatform AddPlatformBtn={AddPlatform} />
      ) : (
        cards.map((card, index) => (
          <BloggerPlatformCard
            key={index}
            card={card}
            SeeOffersBtn={SeeOffers}
            SeeReasonBtn={SeeReason}
            RepeatOfferBtn={RepeatOffer}
            ActivateBtn={ActivatePlatform}
            SupportBtn={Support}
          />
        ))
      )}
    </div>
  );
};
