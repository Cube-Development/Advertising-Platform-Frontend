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
import { Accordion } from "@shared/ui/shadcn-ui/ui/accordion";
import { AllChannelTypes } from "@shared/types/channelStatus";
import { FC } from "react";
import styles from "./styles.module.scss";
import { SpinnerLoader } from "@shared/ui/spinnerLoader";
import { ShowMoreBtn } from "@features/showMore";
import { INTERSECTION_ELEMENTS } from "@shared/config/common";
import { SkeletonBloggerPlatformCard } from "@features/bloggerPlatformCard/skeletonBloggerPlatformCard";

interface ActiveChannelsProps {
  cards: AllChannelTypes[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isNotEmpty: boolean;
}

export const ActiveChannels: FC<ActiveChannelsProps> = ({
  cards,
  isNotEmpty,
  isLoading,
  handleOnChangePage,
}) => {
  return (
    <section className="container sidebar">
      {!isLoading && cards?.length === 0 ? (
        <ZeroPlatform AddPlatformBtn={AddPlatform} page={pageFilter.platform} />
      ) : (
        <Accordion type="single" collapsible>
          <div className={styles.wrapper}>
            {isLoading &&
              Array.from({ length: INTERSECTION_ELEMENTS.platforms }).map(
                (_, index) => <SkeletonBloggerPlatformCard key={index} />,
              )}
            {!isLoading &&
              cards?.map((card) => (
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
            {isNotEmpty && (
              <div className={styles.show_more} onClick={handleOnChangePage}>
                {isLoading ? <SpinnerLoader /> : <ShowMoreBtn />}
              </div>
            )}
          </div>
        </Accordion>
      )}
    </section>
  );
};
