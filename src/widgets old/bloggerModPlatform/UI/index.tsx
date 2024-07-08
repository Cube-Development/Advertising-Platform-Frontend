import { AddPlatform } from "src/features old/addPlatform";
import { ZeroPlatform } from "src/features old/zeroPlatform";
import { FC } from "react";
import styles from "./styles.module.scss";
import { IModerationChannel } from "@shared/types/channelStatus";
import { pageFilter } from "@shared/config/pageFilter";
import { SpinnerLoader } from "@shared/ui/spinnerLoader";
import { ShowMoreBtn } from "src/features old/showMore";
import { INTERSECTION_ELEMENTS } from "@shared/config/common";
import {
  ModChannelCard,
  ModChannelCardSkeleton,
} from "src/entities old/bloggerModPlatformCard";

interface BloggerModPlatformProps {
  cards: IModerationChannel[];
  handleOnChangePage: () => void;
  isLoading: boolean;
  isNotEmpty: boolean;
}

export const BloggerModPlatform: FC<BloggerModPlatformProps> = ({
  cards,
  handleOnChangePage,
  isLoading,
  isNotEmpty,
}) => {
  return (
    <section className="container sidebar">
      {isLoading && cards?.length === 0 ? (
        <ZeroPlatform AddPlatformBtn={AddPlatform} page={pageFilter.platform} />
      ) : (
        <div className={styles.wrapper}>
          {isLoading &&
            Array.from({ length: INTERSECTION_ELEMENTS.modPlatforms }).map(
              (_, index) => <ModChannelCardSkeleton key={index} />,
            )}
          {!isLoading &&
            cards?.map((card, index: number) => (
              <ModChannelCard key={index} card={card} />
            ))}
          {isNotEmpty && (
            <div className={styles.show_more} onClick={handleOnChangePage}>
              {isLoading ? <SpinnerLoader /> : <ShowMoreBtn />}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
