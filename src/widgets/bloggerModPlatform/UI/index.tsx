import { BloggerModPlatformCard } from "@entities/bloggerModPlatformCard";
import { AddPlatform } from "@features/addPlatform";
import { ZeroPlatform } from "@features/zeroPlatform";
import { FC } from "react";
import styles from "./styles.module.scss";
import { IModerationChannel } from "@shared/types/channelStatus";
import { pageFilter } from "@shared/config/pageFilter";
import { SpinnerLoader } from "@shared/ui/spinnerLoader";
import { ShowMoreBtn } from "@features/showMore";

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
      {cards?.length === 0 ? (
        <ZeroPlatform AddPlatformBtn={AddPlatform} page={pageFilter.platform} />
      ) : (
        <div className={styles.wrapper}>
          {cards?.map((card, index: number) => (
            <BloggerModPlatformCard key={index} card={card} />
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
