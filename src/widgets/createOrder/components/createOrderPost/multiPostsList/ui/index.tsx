import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { PostTypesNum, platformTypesNum } from "@entities/platform";
import { ICreatePostForm, IPostChannel } from "@entities/project";
import { BREAKPOINT } from "@shared/config";
import {
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui";

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

  // console.log(filteredPosts)

  useEffect(() => {
    handleChangePost(filteredPosts[0]?.id);
    setTimeout(() => {
      console.log(filteredPosts);
    }, 1000);
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
  };

  const [screen, setScreen] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {screen > BREAKPOINT.LG ? (
        <section className={styles.posts}>
          <p className={styles.posts__title}>
            {t("create_order.create.your_posts")}
          </p>
          <ul className={styles.posts__list}>
            {filteredPosts?.map((post, index) => (
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
      ) : (
        <div className={styles.mobile}>
          <p className={styles.mobile__title}>
            {t("create_order.create.your_posts")}
          </p>
          <Select onValueChange={handleChangePost}>
            <SelectTrigger className={styles.mobile__select}>
              <SelectValue placeholder={`1. ${filteredPosts[0]?.name || ""}`} />
            </SelectTrigger>
            <SelectContent className={styles.mobile__list}>
              <ScrollArea className="max-h-[20dvh]">
                {filteredPosts?.map((post, index) => (
                  <SelectItem key={index} value={`${index + 1}. ${post?.name}`}>
                    <div
                      className={clsx(styles.post, {
                        [styles.active]: selectedMultiPostId === post?.id,
                      })}
                    >
                      {index + 1}. {post?.name}
                    </div>
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};
