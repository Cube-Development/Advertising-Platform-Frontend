import { FC, useEffect } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { PostGeneration } from "@features/postGeneration";
import { PostText } from "@features/postText";
import { PostFiles } from "@features/postFiles";
import { PostButtons } from "@features/postButtons";
import {
  ICreatePostForm,
  IPostChannel,
  PostFormats,
} from "@shared/types/createPost";
import { AddFiles } from "@features/addFiles";
import { AddMediaFiles } from "@features/addMediaFiles";
import { ICreateOrderBlur } from "@shared/types/platform";
import { useAppDispatch, useAppSelector } from "@shared/store";
import {
  PostTypesNum,
  platformTypesNum,
  platformTypesStr,
} from "@shared/config/platformTypes";
import { POST } from "@shared/config/common";
import { CreatePostFormData } from "@shared/config/createPostData";
import { ContinueOrder } from "@features/continueOrder";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import {
  DisplayFeed,
  DisplayShorts,
  DisplayStories,
  DisplayTelegram,
  DisplayVideos,
} from "@shared/ui/postDisplay";
import clsx from "clsx";
import { MultiPostsList } from "../multiPostsList";
import { PlatformFilter, TypeTabs, PostTypesTabs } from "../tabs";
import { checkPosts, renderEditor } from "../functions";

interface CreateOrderPostProps {
  cards: IPostChannel[];
  isBlur?: boolean;
  onChangeBlur: (key: keyof ICreateOrderBlur) => void;
  setValue: UseFormSetValue<ICreatePostForm>;
  getValues: UseFormGetValues<ICreatePostForm>;
  formState: ICreatePostForm;
}

export const CreateOrderPost: FC<CreateOrderPostProps> = ({
  cards,
  isBlur,
  onChangeBlur,
  setValue,
  getValues,
  formState,
}) => {
  const { t } = useTranslation();

  // сразу сохраняем все ордеры в форму posts с учетом платформы и post_type
  useEffect(() => {
    const allPostsUniversal = cards.reduce(
      (
        acc: { platform: platformTypesNum; post_type: PostTypesNum }[],
        card,
      ) => {
        const exists = acc.find(
          (post) =>
            post?.platform === card?.platform &&
            post?.post_type === card?.post_type,
        );
        if (!exists) {
          acc.push({
            platform: card?.platform,
            post_type: card?.post_type,
          });
        }
        return acc;
      },
      [],
    );
    setValue("posts", allPostsUniversal);
    const allPosts = cards.map((card) => ({
      platform: card?.platform,
      post_type: card?.post_type,
      order_id: card?.id,
    }));
    setValue("multiposts", allPosts);
  }, []);

  const platformIds: number[] = [
    ...new Set(cards?.map((card) => card?.platform)),
  ];
  const postFormats = cards?.reduce((acc, order) => {
    const platformIndex = acc.findIndex(
      (item) => item.platform === order.platform,
    );
    if (platformIndex > -1) {
      const existingPlatform = acc[platformIndex];
      if (!existingPlatform.post_types.includes(order.post_type)) {
        existingPlatform.post_types.push(order.post_type);
      }
    } else {
      acc.push({
        platform: order.platform,
        post_types: [order.post_type],
      });
    }
    return acc;
  }, [] as PostFormats[]);

  const { platformFilter: selectedPlatform } = useAppSelector(
    (state) => state.filter,
  );
  const dispatch = useAppDispatch();

  const handleCheckPosts = () => {
    checkPosts(
      formState,
      setValue,
      onChangeBlur,
      platformIds,
      postFormats,
      selectedPlatform,
      dispatch,
      cards,
    );
  };

  return (
    <div id="post" className={`container ${isBlur ? "blur" : ""}`}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.title}>
              <span>2</span>
              <p>{t("create_order.create.title")}</p>
            </div>
            <PostGeneration />
          </div>
          <div className={styles.creating__post}>
            <TypeTabs formState={formState} setValue={setValue} />
            <PlatformFilter
              platforms={platformIds}
              setValue={setValue}
              formats={postFormats}
            />
            <PostTypesTabs
              selectedPlatform={selectedPlatform.id}
              selectedPostType={formState.selectedPostType}
              setValue={setValue}
              formats={postFormats}
            />
            <div className={clsx(styles.data, {})}>
              {formState.isMultiPost && (
                <MultiPostsList
                  platform={selectedPlatform?.id}
                  orders={cards}
                  setValue={setValue}
                  getValues={getValues}
                  selectedMultiPostId={formState?.selectedMultiPostId}
                  selectedPostType={formState?.selectedPostType}
                />
              )}
              <div className={styles.post_data}>
                <div className={styles.block}>
                  {selectedPlatform.id === platformTypesNum.telegram &&
                    renderEditor({
                      platformId: platformTypesNum.telegram,
                      formState,
                      setValue,
                    })}
                  {selectedPlatform.id === platformTypesNum.instagram &&
                    renderEditor({
                      platformId: platformTypesNum.instagram,
                      formState,
                      setValue,
                    })}
                  {selectedPlatform.id === platformTypesNum.youtube &&
                    renderEditor({
                      platformId: platformTypesNum.youtube,
                      formState,
                      setValue,
                    })}
                </div>
                <div
                  className={clsx(styles.block__bottom, {
                    [styles.filter]:
                      selectedPlatform.type !== platformTypesStr.telegram,
                  })}
                >
                  <PostFiles
                    AddFiles={AddFiles}
                    AddMediaFiles={AddMediaFiles}
                    setValue={setValue}
                    platformId={selectedPlatform.id}
                    formState={formState}
                    type={
                      formState?.selectedMultiPostId
                        ? CreatePostFormData.multiposts
                        : CreatePostFormData.posts
                    }
                  />
                  {selectedPlatform.type === platformTypesStr.telegram && (
                    <PostButtons
                      setValue={setValue}
                      formState={formState}
                      platformId={selectedPlatform.id}
                      type={
                        formState?.selectedMultiPostId
                          ? CreatePostFormData.multiposts
                          : CreatePostFormData.posts
                      }
                    />
                  )}
                  <PostText
                    placeholder={"create_order.create.comment"}
                    maxLength={POST.commentLength}
                    rows={4}
                    setValue={setValue}
                    type={
                      formState?.selectedMultiPostId
                        ? CreatePostFormData.multiposts
                        : CreatePostFormData.posts
                    }
                    platformId={selectedPlatform.id}
                    formState={formState}
                  />
                </div>
              </div>
              {!formState.isMultiPost && <div></div>}
              <div className={styles.display}>
                {selectedPlatform.type === platformTypesStr.telegram && (
                  <DisplayTelegram
                    formState={formState}
                    platformId={selectedPlatform.id}
                  />
                )}
                {selectedPlatform.type === platformTypesStr.instagram &&
                  formState.selectedPostType === PostTypesNum.feed && (
                    <DisplayFeed
                      formState={formState}
                      platformId={selectedPlatform.id}
                      postType={PostTypesNum.feed}
                    />
                  )}
                {selectedPlatform.type === platformTypesStr.instagram &&
                  formState.selectedPostType ===
                    PostTypesNum.FullHd_vertical && (
                    <DisplayStories
                      formState={formState}
                      platformId={selectedPlatform.id}
                      postType={PostTypesNum.FullHd_vertical}
                    />
                  )}
                {selectedPlatform.type === platformTypesStr.youtube &&
                  formState.selectedPostType ===
                    PostTypesNum.FullHd_vertical && (
                    <DisplayShorts
                      formState={formState}
                      platformId={selectedPlatform.id}
                      postType={PostTypesNum.FullHd_vertical}
                    />
                  )}
                {selectedPlatform.type === platformTypesStr.youtube &&
                  formState.selectedPostType ===
                    PostTypesNum.FullHd_horizontal && (
                    <DisplayVideos
                      formState={formState}
                      platformId={selectedPlatform.id}
                      postType={PostTypesNum.FullHd_horizontal}
                    />
                  )}
                <div className={styles.continue}>
                  <ContinueOrder onClick={handleCheckPosts} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
