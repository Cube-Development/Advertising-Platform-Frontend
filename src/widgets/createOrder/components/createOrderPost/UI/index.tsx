import { FC, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import {
  DisplayFeed,
  DisplayShorts,
  DisplayStories,
  DisplayTelegram,
  DisplayVideos,
  PostTypesNum,
  platformTypesNum,
  platformTypesStr,
} from "@entities/platform";
import clsx from "clsx";
import { MultiPostsList } from "../multiPostsList";
import { PlatformFilter, TypeTabs, PostTypesTabs } from "../tabs";
import { checkPosts, renderEditor } from "../functions";
import {
  AddFiles,
  AddMediaFiles,
  ContinueOrder,
  PostButtons,
  PostComment,
  PostFiles,
  PostGeneration,
} from "@features/createOrder";
import {
  ContentType,
  CreatePostFormData,
  getContentType,
  ICreatePostForm,
  IPostChannel,
  POST,
  PostFormats,
  useGetUploadLinkMutation,
} from "@entities/project";
import { ICreateOrderBlur } from "@widgets/createOrder/config";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@shared/ui";
import { PostIcon } from "@shared/assets";
import { X } from "lucide-react";
import { getFileExtension } from "@shared/functions";

interface CreateOrderPostProps {
  cards: IPostChannel[];
  isBlur?: boolean;
  onChangeBlur: (key: keyof ICreateOrderBlur) => void;
  setValue: UseFormSetValue<ICreatePostForm>;
  getValues: UseFormGetValues<ICreatePostForm>;
  formState: ICreatePostForm;
  setIsUploadLoading: (bool: boolean) => void;
}

export const CreateOrderPost: FC<CreateOrderPostProps> = ({
  cards,
  isBlur,
  onChangeBlur,
  setValue,
  getValues,
  formState,
  setIsUploadLoading,
}) => {
  const { t } = useTranslation();
  const [getUploadLink] = useGetUploadLinkMutation();

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

  const uploadFilesAndMedia = async () => {
    if (formState?.isMultiPost && formState?.multiposts) {
      await Promise.all(
        formState.multiposts.map(async (post) => {
          if (post?.buttons) {
            if (!post.content) {
              post.content = [];
            }
            post.content.push(...post.buttons);
          }
          if (post?.text) {
            if (!post.content) {
              post.content = [];
            }
            post.content.push(...post.text);
          }
          if (post?.files) {
            await Promise.all(
              post.files.map(async (file) => {
                const data = await getUploadLink({
                  extension: getFileExtension(file),
                  content_type: ContentType.file,
                }).unwrap();
                await fetch(data?.url, {
                  method: "PUT",
                  body: file,
                });
                if (!post.content) {
                  post.content = [];
                }
                post.content.push({
                  content_type: ContentType.file,
                  content: data.file_name,
                });
              }),
            );
          }
          if (post?.media) {
            await Promise.all(
              post.media.map(async (media) => {
                const data = await getUploadLink({
                  extension: getFileExtension(media),
                  content_type: getContentType(media),
                }).unwrap();
                await fetch(data?.url, {
                  headers: {
                    "Content-Type": media.type,
                  },
                  method: "PUT",
                  body: media,
                });
                if (!post.content) {
                  post.content = [];
                }
                post.content.push({
                  content_type: getContentType(media),
                  content: data.file_name,
                });
              }),
            );
          }
        }),
      );
    } else {
      if (formState?.posts) {
        await Promise.all(
          formState.posts.map(async (post) => {
            if (post?.buttons) {
              if (!post.content) {
                post.content = [];
              }
              post.content.push(...post.buttons);
            }
            if (post?.text) {
              if (!post.content) {
                post.content = [];
              }
              post.content.push(...post.text);
            }
            if (post?.files) {
              await Promise.all(
                post.files.map(async (file) => {
                  const data = await getUploadLink({
                    extension: getFileExtension(file),
                    content_type: ContentType.file,
                  }).unwrap();
                  await fetch(data?.url, {
                    method: "PUT",
                    body: file,
                  });
                  if (!post.content) {
                    post.content = [];
                  }
                  post.content.push({
                    content_type: ContentType.file,
                    content: data.file_name,
                  });
                }),
              );
            }
            if (post?.media) {
              await Promise.all(
                post.media.map(async (media) => {
                  const data = await getUploadLink({
                    extension: getFileExtension(media),
                    content_type: getContentType(media),
                  }).unwrap();
                  await fetch(data?.url, {
                    headers: {
                      "Content-Type": media.type,
                    },
                    method: "PUT",
                    body: media,
                  });
                  if (!post.content) {
                    post.content = [];
                  }
                  post.content.push({
                    content_type: getContentType(media),
                    content: data.file_name,
                  });
                }),
              );
            }
          }),
        );
      }
    }
  };

  const handleCheckPosts = async () => {
    setIsUploadLoading(true);
    try {
      checkPosts(
        formState,
        setValue,
        onChangeBlur,
        platformIds,
        postFormats,
        formState.platformFilter,
        cards,
      );
      await uploadFilesAndMedia();
    } finally {
      setIsUploadLoading(false);
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
    <div id="post" className={`container ${isBlur ? "blur" : ""}`}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.title}>
              <span className="gradient_color">2</span>
              <p className="gradient_color">{t("create_order.create.title")}</p>
            </div>
            <PostGeneration />
          </div>
          <div className={styles.creating__post}>
            <TypeTabs formState={formState} setValue={setValue} />
            <PlatformFilter
              platforms={platformIds}
              setValue={setValue}
              formats={postFormats}
              platformFilter={formState.platformFilter}
            />
            <PostTypesTabs
              selectedPlatform={formState?.platformFilter?.id}
              selectedPostType={formState?.selectedPostType}
              setValue={setValue}
              formats={postFormats}
            />
            <div
              className={`${styles.data} ${!formState.isMultiPost && styles.not_multi}`}
            >
              {formState.isMultiPost && (
                <MultiPostsList
                  platform={formState.platformFilter?.id}
                  orders={cards}
                  setValue={setValue}
                  getValues={getValues}
                  selectedMultiPostId={formState?.selectedMultiPostId}
                  selectedPostType={formState?.selectedPostType}
                />
              )}
              <div className={styles.post_data}>
                <div className={styles.block}>
                  {formState.platformFilter?.id === platformTypesNum.telegram &&
                    renderEditor({
                      platformId: platformTypesNum.telegram,
                      formState,
                      setValue,
                    })}
                  {formState.platformFilter?.id ===
                    platformTypesNum.instagram &&
                    renderEditor({
                      platformId: platformTypesNum.instagram,
                      formState,
                      setValue,
                    })}
                  {formState.platformFilter?.id === platformTypesNum.youtube &&
                    renderEditor({
                      platformId: platformTypesNum.youtube,
                      formState,
                      setValue,
                    })}
                </div>
                <div
                  className={clsx(styles.block__bottom, {
                    [styles.filter]:
                      formState.platformFilter?.type !==
                      platformTypesStr.telegram,
                  })}
                >
                  <PostFiles
                    AddFiles={AddFiles}
                    AddMediaFiles={AddMediaFiles}
                    setValue={setValue}
                    platformId={formState.platformFilter?.id}
                    formState={formState}
                    type={
                      formState?.selectedMultiPostId
                        ? CreatePostFormData.multiposts
                        : CreatePostFormData.posts
                    }
                    screen={screen}
                  />
                  {formState.platformFilter?.type ===
                    platformTypesStr.telegram && (
                    <PostButtons
                      setValue={setValue}
                      formState={formState}
                      platformId={formState?.platformFilter?.id}
                      type={
                        formState?.selectedMultiPostId
                          ? CreatePostFormData.multiposts
                          : CreatePostFormData.posts
                      }
                    />
                  )}
                  <PostComment
                    placeholder={"create_order.create.comment"}
                    maxLength={POST.commentLength}
                    rows={4}
                    setValue={setValue}
                    type={
                      formState?.selectedMultiPostId
                        ? CreatePostFormData.multiposts
                        : CreatePostFormData.posts
                    }
                    platformId={formState.platformFilter?.id}
                    formState={formState}
                  />
                </div>
              </div>
              <div className={styles.display}>
                {formState.platformFilter?.type ===
                  platformTypesStr.telegram && (
                  <DisplayTelegram
                    formState={formState}
                    platformId={formState.platformFilter?.id}
                  />
                )}
                {formState.platformFilter?.type ===
                  platformTypesStr.instagram &&
                  formState.selectedPostType === PostTypesNum.feed && (
                    <DisplayFeed
                      formState={formState}
                      platformId={formState.platformFilter?.id}
                      postType={PostTypesNum.feed}
                    />
                  )}
                {formState.platformFilter?.type ===
                  platformTypesStr.instagram &&
                  formState.selectedPostType ===
                    PostTypesNum.FullHd_vertical && (
                    <DisplayStories
                      formState={formState}
                      platformId={formState.platformFilter.id}
                      postType={PostTypesNum.FullHd_vertical}
                    />
                  )}
                {formState.platformFilter?.type === platformTypesStr.youtube &&
                  formState.selectedPostType ===
                    PostTypesNum.FullHd_vertical && (
                    <DisplayShorts
                      formState={formState}
                      platformId={formState.platformFilter?.id}
                      postType={PostTypesNum.FullHd_vertical}
                    />
                  )}
                {formState.platformFilter?.type === platformTypesStr.youtube &&
                  formState.selectedPostType ===
                    PostTypesNum.FullHd_horizontal && (
                    <DisplayVideos
                      formState={formState}
                      platformId={formState.platformFilter?.id}
                      postType={PostTypesNum.FullHd_horizontal}
                    />
                  )}
                <div className={styles.continue}>
                  <ContinueOrder onClick={handleCheckPosts} />
                </div>
              </div>
              <div className={styles.display_mobile}>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className={styles.see_post_btn}>
                      <p>{t("create_order.create.see_post_mobile_btn")}</p>
                      <div className={styles.icon}>
                        <PostIcon />
                      </div>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent
                    className={`max-w-[300px] gap-0 bg-transparent grid items-center justify-center shadow-none ${screen > 475 ? "w-[50vw]" : "w-[60vw]"}`}
                  >
                    <div className="relative">
                      <AlertDialogAction>
                        <X className="absolute -right-8 -top-4 w-[30px] rounded-full p-1 bg-white cursor-pointer" />
                      </AlertDialogAction>
                      {formState.platformFilter?.type ===
                        platformTypesStr.telegram && (
                        <DisplayTelegram
                          formState={formState}
                          platformId={formState.platformFilter?.id}
                        />
                      )}
                      {formState.platformFilter?.type ===
                        platformTypesStr.instagram &&
                        formState.selectedPostType === PostTypesNum.feed && (
                          <DisplayFeed
                            formState={formState}
                            platformId={formState.platformFilter?.id}
                            postType={PostTypesNum.feed}
                          />
                        )}
                      {formState.platformFilter?.type ===
                        platformTypesStr.instagram &&
                        formState.selectedPostType ===
                          PostTypesNum.FullHd_vertical && (
                          <DisplayStories
                            formState={formState}
                            platformId={formState.platformFilter.id}
                            postType={PostTypesNum.FullHd_vertical}
                          />
                        )}
                      {formState.platformFilter?.type ===
                        platformTypesStr.youtube &&
                        formState.selectedPostType ===
                          PostTypesNum.FullHd_vertical && (
                          <DisplayShorts
                            formState={formState}
                            platformId={formState.platformFilter?.id}
                            postType={PostTypesNum.FullHd_vertical}
                          />
                        )}
                      {formState.platformFilter?.type ===
                        platformTypesStr.youtube &&
                        formState.selectedPostType ===
                          PostTypesNum.FullHd_horizontal && (
                          <DisplayVideos
                            formState={formState}
                            platformId={formState.platformFilter?.id}
                            postType={PostTypesNum.FullHd_horizontal}
                          />
                        )}
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div className={styles.continue_mobile}>
                <ContinueOrder onClick={handleCheckPosts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
