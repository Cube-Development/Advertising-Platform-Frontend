import { FC, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { PostTypesNum, platformTypesNum } from "@entities/platform";
import {
  ICreatePostForm,
  IPostChannel,
  platformToIcon,
} from "@entities/project";

interface MultiPostsListProps {
  platform: platformTypesNum;
  orders: IPostChannel[];
  setValue: UseFormSetValue<ICreatePostForm>;
  getValues: UseFormGetValues<ICreatePostForm>;
  selectedMultiPostId: string | undefined | null;
  selectedPostType: PostTypesNum;
}

export const MultiPostsList: FC<MultiPostsListProps> = ({
  platform,
  orders,
  setValue,
  getValues,
  selectedMultiPostId,
  selectedPostType,
}) => {
  const { t } = useTranslation();
  const filteredPosts = orders?.filter(
    (order) =>
      order?.platform === platform && order?.post_type === selectedPostType,
  );

  const activePostRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    handleChangePost(filteredPosts[0]?.id);
  }, [selectedPostType, platform]);

  const handleChangePost = (order_id: string) => {
    setValue("selectedMultiPostId", order_id);
    const multiPosts = getValues("multiposts") || [];
    const currentPost = multiPosts.find((post) => post?.order_id === order_id);
    if (!currentPost) {
      setValue("multiposts", [
        ...multiPosts,
        { order_id, platform, post_type: selectedPostType },
      ]);
    }

    setTimeout(() => {
      if (activePostRef.current) {
        activePostRef.current.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }, 0);
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.posts}>
        <p className={styles.posts__title}>
          {t("create_order.create.your_posts")}
          <span className={styles.icon}>
            {platform in platformToIcon ? platformToIcon[platform]() : null}
          </span>
        </p>
        <ul className={styles.posts__list}>
          {filteredPosts?.map((post, index) => (
            <li
              onClick={() => handleChangePost(post?.id)}
              key={index}
              className={clsx(styles.post, {
                [styles.active]: selectedMultiPostId === post?.id,
              })}
              ref={selectedMultiPostId === post?.id ? activePostRef : null}
            >
              {index + 1}. {post?.name}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
