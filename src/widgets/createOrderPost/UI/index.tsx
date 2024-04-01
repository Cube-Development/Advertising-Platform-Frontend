import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { PostGeneration } from "@features/postGeneration";
import { PostText } from "@features/postText";
import { PostFiles } from "@features/postFiles";
import { PostButtons } from "@features/postButtons";
import { PostDispay } from "@features/postDispay";
import { BarPostFilter } from "@features/barPostFilter";
import { IPostChannel } from "@shared/types/createPost";
import { AddFiles } from "@features/addFiles";
import { AddMediaFiles } from "@features/addMediaFiles";

interface CreateOrderPostProps {
  cards: IPostChannel[];
  isBlur?: boolean;
}

export const CreateOrderPost: FC<CreateOrderPostProps> = ({
  cards,
  isBlur,
}) => {
  const { t } = useTranslation();

  const platforms: number[] = [...new Set(cards.map((card) => card.platform))];

  return (
    <div className={`container ${isBlur ? "blur" : ""}`}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.title}>
            <span>2</span>
            <p>{t("create_order.create.title")}</p>
          </div>
          <PostGeneration />
        </div>
        <div className={styles.creating__post}>
          <div className={styles.filter}>
            <BarPostFilter platforms={platforms} />
          </div>
          <div className={styles.data}>
            <div className={styles.post_data}>
              <div className={styles.block}>
                <PostText placeholder={"create_order.create.text"} />
              </div>
              <div className={styles.block}>
                <PostFiles AddFiles={AddFiles} AddMediaFiles={AddMediaFiles} />
                <PostButtons />
                <PostText placeholder={"create_order.create.comment"} />
              </div>
            </div>
            <div className={styles.display}>
              <PostDispay />
            </div>
          </div>
        </div>
        Creat post
      </div>
    </div>
  );
};
