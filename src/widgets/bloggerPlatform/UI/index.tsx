import { ActivatePlatform } from "@features/activatePlatform";
import { AddPlatform } from "@features/addPlatform";
import { BloggerPlatformCard } from "@features/bloggerPlatformCard";
import { RepeatOffer } from "@features/repeatOffer";
import { SeeOffers } from "@features/seeOffers";
import { SeeReason } from "@features/seeReason";
import { Support } from "@features/support";
import { ZeroPlatform } from "@features/zeroPlatform";
import {
  IActiveChannelBlogger,
  IBlockedChannelBlogger,
  IInactiveChannelBlogger,
  IModerationChannelBlogger,
  IModerationRejectChannelBlogger,
} from "@shared/types/channelStatus";
import { FC } from "react";

interface BloggerPlatformProps {
  cards:
    | IActiveChannelBlogger
    | IInactiveChannelBlogger
    | IModerationRejectChannelBlogger
    | IBlockedChannelBlogger
    | IModerationChannelBlogger;
}

export const BloggerPlatform: FC<BloggerPlatformProps> = ({ cards }) => {
  return (
    <div className="container sidebar">
      {cards?.channels.length === 0 ? (
        <ZeroPlatform AddPlatformBtn={AddPlatform} />
      ) : (
        cards?.channels.map((card, index) => (
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
