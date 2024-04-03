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
import { ICreateOrderBlur } from "@shared/types/platform";
import { useAppSelector } from "@shared/store";
import { platformFilter } from "@shared/config/postFilter";
import { POST } from "@shared/config/common";

interface CreateOrderPostProps {
  cards: IPostChannel[];
  isBlur?: boolean;
  onChangeBlur: (key: keyof ICreateOrderBlur) => void;
}

export const CreateOrderPost: FC<CreateOrderPostProps> = ({
  cards,
  isBlur,
  onChangeBlur,
}) => {
  const { t } = useTranslation();

  const platforms: number[] = [...new Set(cards.map((card) => card.platform))];

  const handleOnChangeBlur = () => {
    onChangeBlur("datetime");
  };

  const { platformFilter: filter } = useAppSelector(
    (state) => state.filterReducer,
  );

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
                <PostText
                  placeholder={"create_order.create.text"}
                  maxLength={POST.postLenght}
                  rows={10}
                />
              </div>
              <div className={styles.block}>
                <PostFiles AddFiles={AddFiles} AddMediaFiles={AddMediaFiles} />
                {filter === platformFilter.telegram && <PostButtons />}

                <PostText
                  placeholder={"create_order.create.comment"}
                  maxLength={POST.commentLenght}
                  rows={4}
                />
              </div>
            </div>
            <div className={styles.display}>
              <PostDispay />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
