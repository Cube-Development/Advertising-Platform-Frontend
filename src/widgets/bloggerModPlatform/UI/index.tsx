import { BloggerModPlatformCard } from "@entities/bloggerModPlatformCard";
import { AddPlatform } from "@features/addPlatform";
import { ZeroPlatform } from "@features/zeroPlatform";
import { IModerationChannelBlogger } from "@shared/types/channelStatus";
import { FC } from "react";
import styles from "./styles.module.scss";
import { pageFilter } from "@shared/config/pageFilter";

interface BloggerModPlatformProps {
  cards: IModerationChannelBlogger;
}

export const BloggerModPlatform: FC<BloggerModPlatformProps> = ({ cards }) => {
  return (
    <section className="container sidebar">
      {cards?.channels?.length === 0 ? (
        <ZeroPlatform AddPlatformBtn={AddPlatform} page={pageFilter.platform} />
      ) : (
        <div className={styles.wrapper}>
          {cards?.channels?.map((card, index: number) => (
            <BloggerModPlatformCard key={index} card={card} />
          ))}
        </div>
      )}
    </section>
  );
};
