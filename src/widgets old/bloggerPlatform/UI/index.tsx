import { ActivatePlatform } from "src/features old/activatePlatform";
import { AddPlatform } from "src/features old/addPlatform";
import { BloggerPlatformCard } from "src/features old/bloggerPlatformCard";
import { BloggerPlatformCardMenu } from "src/features old/bloggerPlatformCardMenu";
import { ChannelDescription } from "src/features old/channelDescription";
import { DeleteChannel } from "src/features old/deleteChannel";
import { RepeatOffer } from "src/features old/repeatOffer";
import { SeeOffers } from "src/features old/seeOffers";
import { SeeReason } from "src/features old/seeReason";
import { Support } from "src/features old/support";
import { ZeroPlatform } from "src/features old/zeroPlatform";
import { pageFilter } from "@shared/config/pageFilter";
import { Accordion } from "@shared/ui/shadcn-ui/ui/accordion";
import { AllChannelTypes } from "@shared/types/channelStatus";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { SpinnerLoader } from "@shared/ui/spinnerLoader";
import { ShowMoreBtn } from "src/features old/showMore";
import { INTERSECTION_ELEMENTS } from "@shared/config/common";
import { SkeletonBloggerPlatformCard } from "src/features old/bloggerPlatformCard/skeletonBloggerPlatformCard";

interface BloggerPlatformProps {
  cards: AllChannelTypes[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isNotEmpty: boolean;
}

export const BloggerPlatform: FC<BloggerPlatformProps> = ({
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
