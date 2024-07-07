import { PostTypesNum, networkTypes } from "@shared/config/platformTypes";
import { ICreatePostForm, PostFormats } from "@shared/types/createPost";
import { FC } from "react";
import { UseFormSetValue } from "react-hook-form";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface PostTypesTabsProps {
  selectedPlatform: number;
  setValue: UseFormSetValue<ICreatePostForm>;
  selectedPostType: PostTypesNum;
  formats: PostFormats[];
}

export const PostTypesTabs: FC<PostTypesTabsProps> = ({
  selectedPlatform,
  setValue,
  selectedPostType,
  formats,
}) => {
  const { t } = useTranslation();
  const changeType = (type: PostTypesNum) => {
    setValue("selectedPostType", type);
  };

  return (
    <div className={styles.post_types}>
      {formats.map(
        (network) =>
          network.platform === selectedPlatform &&
          network.post_types.map((type, index) => {
            // Находим имя поста
            const platform = networkTypes.find(
              (net) => net.id === selectedPlatform,
            );
            const format = platform?.post_types.find((f) => f.id === type);
            return (
              <div
                key={index}
                onClick={() => changeType(type)}
                className={clsx(styles.post_types__type, {
                  [styles.active__type]: selectedPostType === type,
                })}
              >
                {t(`${format?.name}`)}
              </div>
            );
          }),
      )}
    </div>
  );
};
