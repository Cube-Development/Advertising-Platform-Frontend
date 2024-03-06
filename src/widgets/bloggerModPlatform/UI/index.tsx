import { BloggerModPlatformCard } from "@entities/bloggerModPlatformCard";
import { AddPlatform } from "@features/addPlatform";
import { ZeroPlatform } from "@features/zeroPlatform";
import { IBloggerPlatformCard } from "@shared/types/common";
import { FC } from "react";
import styles from "./styles.module.scss";

interface BloggerModPlatformProps {
  cards: IBloggerPlatformCard[];
}

export const BloggerModPlatform: FC<BloggerModPlatformProps> = ({ cards }) => {
  return (
    <div className="container sidebar">
      {cards.length === 0 ? (
        <ZeroPlatform AddPlatformBtn={AddPlatform} />
      ) : (
        cards.map((card, index) => (
          <BloggerModPlatformCard key={index} card={card} />
        ))
      )}
    </div>
  );
};
