import { ActivatePlatform } from "@features/activatePlatform";
import { AddPlatform } from "@features/addPlatform";
import { BloggerPlatformCard } from "@features/bloggerPlatformCard";
import { BloggerPlatformCardMenu } from "@features/bloggerPlatformCardMenu";
import { ChannelDescription } from "@features/channelDescription";
import { DeleteChannel } from "@features/deleteChannel";
import { RepeatOffer } from "@features/repeatOffer";
import { SeeOffers } from "@features/seeOffers";
import { SeeReason } from "@features/seeReason";
import { Support } from "@features/support";
import { ZeroPlatform } from "@features/zeroPlatform";
import { pageFilter } from "@shared/config/pageFilter";
import {
  IActiveChannelBlogger,
  IBlockedChannelBlogger,
  IInactiveChannelBlogger,
  IModerationChannelBlogger,
  IModerationRejectChannelBlogger,
} from "@shared/types/channelStatus";
import { Accordion } from "@shared/ui/shadcn-ui/ui/accordion";
import { FC } from "react";
import styles from "./styles.module.scss";

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
    <section className="container sidebar">
      {cards?.channels.length === 0 ? (
        <ZeroPlatform AddPlatformBtn={AddPlatform} page={pageFilter.platform} />
      ) : (
        <Accordion type="single" collapsible>
          <div className={styles.wrapper}>
            {cards?.channels?.map((card) => (
              <BloggerPlatformCard
                key={card.id}
                card={card}
                DeleteChannel={DeleteChannel}
                ChannelDescriptionBtn={ChannelDescription}
                BloggerPlatformCardMenu={BloggerPlatformCardMenu}
                SeeOffersBtn={SeeOffers}
                SeeReasonBtn={SeeReason}
                RepeatOfferBtn={RepeatOffer}
                ActivateBtn={ActivatePlatform}
                SupportBtn={Support}
              />
            ))}
          </div>
        </Accordion>
      )}
    </section>
  );
};
