import { PostTypesNum, platformTypesNum } from "@entities/platform";
import {
  ICreatePost,
  ICreatePostForm,
  IPostChannel,
  platformToIcon,
} from "@entities/project";
import {
  countMultipostGroup,
  detachOrderFromGroup,
  getMultipostGroupKey,
  isMultipostEntryFilled,
  mergeOrderIntoSelection,
} from "@entities/project";
import clsx from "clsx";
import { Check, Link2, Unlink } from "lucide-react";
import { FC, useEffect, useRef } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface MultiPostsListProps {
  platform: platformTypesNum;
  orders: IPostChannel[];
  multiposts: ICreatePost[] | undefined;
  setValue: UseFormSetValue<ICreatePostForm>;
  getValues: UseFormGetValues<ICreatePostForm>;
  selectedMultiPostId: string | undefined | null;
  selectedPostType: PostTypesNum;
}

export const MultiPostsList: FC<MultiPostsListProps> = ({
  platform,
  orders,
  multiposts = [],
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
    if (!order_id) return;
    setValue("selectedMultiPostId", order_id);
    const multiPosts = getValues("multiposts") || [];
    const currentPost = multiPosts.find((post) => post?.order_id === order_id);
    if (!currentPost) {
      setValue("multiposts", [
        ...multiPosts,
        {
          order_id,
          platform,
          post_type: selectedPostType,
          post_group_id: order_id,
        },
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

  const mergeIntoSelected = (e: React.MouseEvent, targetOrderId: string) => {
    e.stopPropagation();
    if (!selectedMultiPostId || selectedMultiPostId === targetOrderId) return;
    const next = mergeOrderIntoSelection(
      getValues("multiposts") || [],
      selectedMultiPostId,
      targetOrderId,
    );
    setValue("multiposts", next);
  };

  const detach = (e: React.MouseEvent, orderId: string) => {
    e.stopPropagation();
    const next = detachOrderFromGroup(getValues("multiposts") || [], orderId);
    setValue("multiposts", next);
    setValue("selectedMultiPostId", orderId);
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
        <p className={styles.posts__hint}>
          {t("create_order.create.multi_posts_list.hint")}
        </p>
        <ul className={styles.posts__list}>
          {filteredPosts?.map((post, index) => {
            const entry = multiposts.find((p) => p.order_id === post.id);
            const filled = entry ? isMultipostEntryFilled(entry) : false;
            const groupSize = entry
              ? countMultipostGroup(multiposts, entry)
              : 1;
            const selectedEntry = multiposts.find(
              (p) => p.order_id === selectedMultiPostId,
            );
            const sameGroupAsSelected =
              !!selectedMultiPostId &&
              !!entry &&
              !!selectedEntry &&
              getMultipostGroupKey(entry) ===
                getMultipostGroupKey(selectedEntry);

            return (
              <li
                onClick={() => handleChangePost(post?.id)}
                key={post.id}
                className={clsx(
                  styles.post,
                  {
                    [styles.active]: selectedMultiPostId === post?.id,
                    [styles.filled]: filled,
                  },
                  "truncate",
                )}
                ref={selectedMultiPostId === post?.id ? activePostRef : null}
              >
                <div className={styles.post__inner}>
                  <span
                    className={clsx(styles.status, {
                      [styles.status_done]: filled,
                    })}
                    aria-hidden
                  >
                    {filled ? (
                      <Check className={styles.check_icon} strokeWidth={3} />
                    ) : null}
                  </span>
                  <span className={styles.post__title}>
                    {index + 1}. {post?.name}
                    {groupSize > 1 ? (
                      <span className={styles.group_badge}>
                        {t("create_order.create.multi_posts_list.group_badge", {
                          count: groupSize,
                        })}
                      </span>
                    ) : null}
                  </span>
                  <span className={styles.actions}>
                    {groupSize > 1 ? (
                      <button
                        type="button"
                        className={styles.icon_btn}
                        title={t(
                          "create_order.create.multi_posts_list.unlink_title",
                        )}
                        onClick={(e) => detach(e, post.id)}
                      >
                        <Unlink className={styles.action_icon} />
                      </button>
                    ) : null}
                    <button
                      type="button"
                      className={styles.icon_btn}
                      disabled={
                        !selectedMultiPostId ||
                        selectedMultiPostId === post.id ||
                        sameGroupAsSelected
                      }
                      title={t(
                        "create_order.create.multi_posts_list.link_title",
                      )}
                      onClick={(e) => mergeIntoSelected(e, post.id)}
                    >
                      <Link2 className={styles.action_icon} />
                    </button>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};
