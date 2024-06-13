import { platformTypesNum } from "@shared/config/platformTypes";
import { ICreatePostForm, IPostChannel } from "@shared/types/createPost";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

interface MultiPostsListProps {
  platform: platformTypesNum;
  orders: IPostChannel[];
  setValue: UseFormSetValue<ICreatePostForm>;
  getValues: UseFormGetValues<ICreatePostForm>;
  selectedMultiPostId: string | undefined | null;
}

export const MultiPostsList: FC<MultiPostsListProps> = ({
  platform,
  orders,
  setValue,
  getValues,
  selectedMultiPostId,
}) => {
  const { t } = useTranslation();
  const platformPosts = orders?.filter((order) => order?.platform === platform);

  useEffect(() => {
    handleChangePost(platformPosts[0]?.id);
  }, [platform]);

  const handleChangePost = (order_id: string) => {
    setValue("selectedMultiPostId", order_id);
    const multiPosts = getValues("multiposts") || [];
    const currentPost = multiPosts.find((post) => post?.order_id === order_id);
    if (!currentPost) {
      setValue("multiposts", [...multiPosts, { order_id, platform }]);
    }
  };
  return (
    <section className={styles.posts}>
      <p className={styles.posts__title}>
        {t("create_order.create.your_posts")}
      </p>
      <ul className={styles.posts__list}>
        {platformPosts?.map((post, index) => (
          <li
            onClick={() => handleChangePost(post?.id)}
            key={index}
            className={clsx(styles.post, {
              [styles.active]: selectedMultiPostId === post?.id,
            })}
          >
            {index + 1}. {post?.name}
          </li>
        ))}
      </ul>
    </section>
  );
};
