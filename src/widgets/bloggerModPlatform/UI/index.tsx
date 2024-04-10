import { BloggerModPlatformCard } from "@entities/bloggerModPlatformCard";
import { AddPlatform } from "@features/addPlatform";
import { ZeroPlatform } from "@features/zeroPlatform";
import { FC } from "react";
import { IModerationChannelBlogger } from "@shared/types/channelStatus";

interface BloggerModPlatformProps {
  cards: IModerationChannelBlogger;
}

export const BloggerModPlatform: FC<BloggerModPlatformProps> = ({ cards }) => {
  return (
    <div className="container sidebar">
      {cards.channels.length === 0 ? (
        <ZeroPlatform AddPlatformBtn={AddPlatform} />
      ) : (
        cards.channels.map((card, index: number) => (
          <BloggerModPlatformCard key={index} card={card} />
        ))
      )}
    </div>
  );
};
