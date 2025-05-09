import {
  MatchTypesNum,
  PostTypesNum,
  platformTypes,
  platformTypesNum,
  platformTypesStr,
} from "@entities/platform";
import {
  ContentType,
  CreatePostFormData,
  ICreatePostForm,
  IManagerOrderPost,
  IPostChannel,
  IPostData,
  POST,
  PostFormats,
} from "@entities/project";
import {
  AddFiles,
  AddMediaFiles,
  ContinueOrder,
  PostButtons,
  PostComment,
  PostFiles,
} from "@features/createOrder";
import { PostIcon } from "@shared/assets";
import { useWindowWidth } from "@shared/hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  useToast,
} from "@shared/ui";
import { ICreateOrderBlur } from "@widgets/createOrder/config";
import clsx from "clsx";
import { X } from "lucide-react";
import { FC, useEffect } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { checkPosts, renderEditor } from "../functions";
import { MultiPostsList } from "../multiPostsList";
import { RenderDisplay } from "../renderDisplay";
import { PlatformFilter, PostTypesTabs, TypeTabs } from "../tabs";
import styles from "./styles.module.scss";

interface CreateOrderPostProps {
  cards: IPostChannel[];
  posts: IManagerOrderPost[];
  isBlur?: boolean;
  onChangeBlur: (key: keyof ICreateOrderBlur) => void;
  setValue: UseFormSetValue<ICreatePostForm>;
  getValues: UseFormGetValues<ICreatePostForm>;
  formState: ICreatePostForm;
}

async function downloadFile(url: string, fileName: string): Promise<File> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch file: ${response.statusText}`);
  }

  const blob = await response.blob();
  const file = new File([blob], fileName, { type: blob.type });
  return file;
}

export const CreateOrderPost: FC<CreateOrderPostProps> = ({
  cards,
  posts,
  isBlur,
  onChangeBlur,
  setValue,
  getValues,
  formState,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const screen = useWindowWidth();
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

  const downloadAllFiles = async (backFiles: IPostData[]) => {
    const promises: Promise<File>[] = backFiles.map((file) =>
      downloadFile(file.url, file.content),
    );
    return await Promise.all(promises);
  };

  // если есть посты на стороне бека то они заполнятся внутрь формы
  useEffect(() => {
    if (
      posts?.length &&
      (formState?.posts?.length || formState?.multiposts?.length)
    ) {
      const universalOrders = posts.filter(
        (post) => post.match_type === MatchTypesNum.universal,
      );
      const uniqueOrders = posts.filter(
        (post) => post.match_type === MatchTypesNum.unique,
      );
      const isMultiPost = !!uniqueOrders?.length;
      setValue("isMultiPost", isMultiPost);

      if (universalOrders?.length) {
        const processUniversalPosts = async () => {
          setValue("isDownloadPosts", true);

          // Этап 1: Обработка текстовых данных
          const textDataUpdatedPosts = (formState?.posts || []).map(
            (formPost) => {
              const backPost = posts.find(
                (post) => post.match_type === MatchTypesNum.universal,
              );

              return {
                ...formPost,
                text: backPost?.files?.filter(
                  (el) => el?.content_type === ContentType.text,
                ),
                buttons: backPost?.files?.filter(
                  (el) => el?.content_type === ContentType.button,
                ),
                comment: backPost?.comment,
              };
            },
          );

          setValue("posts", textDataUpdatedPosts); // Устанавливаем текстовые данные

          // Этап 2: Загрузка файлов
          const postsWithFiles = await Promise.all(
            textDataUpdatedPosts.map(async (formPost) => {
              const backPost = posts.find(
                (post) => post.match_type === MatchTypesNum.universal,
              );

              const backFiles = backPost?.files?.filter(
                (el) => el?.content_type === ContentType.file,
              );
              const backMedia = backPost?.files?.filter((el) =>
                [ContentType.photo, ContentType.video].includes(
                  el?.content_type,
                ),
              );

              let files: File[] | undefined;
              let media: File[] | undefined;

              if (backFiles?.length) {
                files = await downloadAllFiles(backFiles);
              }
              if (backMedia?.length) {
                media = await downloadAllFiles(backMedia);
              }

              return {
                ...formPost,
                files: files,
                media: media,
              };
            }),
          );

          setValue("posts", postsWithFiles); // Устанавливаем данные с файлами
          setValue("isDownloadPosts", false);
        };

        processUniversalPosts();
      }

      if (uniqueOrders?.length) {
        const processUniquePosts = async () => {
          setValue("isDownloadPosts", true);

          // Этап 1: Обработка текстовых данных
          const textDataUpdatedMultiposts = (formState?.multiposts || []).map(
            (formPost) => {
              const backPost = posts.find(
                (post) =>
                  post.match_type === MatchTypesNum.unique &&
                  !!post.orders.find(
                    (order) => order.order_id === formPost.order_id,
                  ),
              );

              return {
                ...formPost,
                text: backPost?.files?.filter(
                  (el) => el?.content_type === ContentType.text,
                ),
                buttons: backPost?.files?.filter(
                  (el) => el?.content_type === ContentType.button,
                ),
                comment: backPost?.comment,
              };
            },
          );

          setValue("multiposts", textDataUpdatedMultiposts); // Устанавливаем текстовые данные

          // Этап 2: Загрузка файлов
          const multipostsWithFiles = await Promise.all(
            textDataUpdatedMultiposts.map(async (formPost) => {
              const backPost = posts.find(
                (post) =>
                  post.match_type === MatchTypesNum.unique &&
                  !!post.orders.find(
                    (order) => order.order_id === formPost.order_id,
                  ),
              );

              const backFiles = backPost?.files?.filter(
                (el) => el?.content_type === ContentType.file,
              );
              const backMedia = backPost?.files?.filter((el) =>
                [ContentType.photo, ContentType.video].includes(
                  el?.content_type,
                ),
              );

              let files: File[] | undefined;
              let media: File[] | undefined;

              if (backFiles?.length) {
                files = await downloadAllFiles(backFiles);
              }
              if (backMedia?.length) {
                media = await downloadAllFiles(backMedia);
              }

              return {
                ...formPost,
                files: files,
                media: media,
              };
            }),
          );

          setValue("multiposts", multipostsWithFiles); // Устанавливаем данные с файлами
          setValue("isDownloadPosts", false);
        };

        processUniquePosts();
      }
    }
  }, [posts?.length, formState?.posts?.length, formState?.multiposts?.length]);

  const cardsIds: number[] = [...new Set(cards?.map((card) => card?.platform))];
  const platformTypesIds: number[] = platformTypes.map(
    (platform) => platform?.id,
  );
  const platformIds: number[] = platformTypesIds.filter((el) =>
    cardsIds.includes(el),
  );

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

  const handleCheckPosts = async () => {
    const isValid = checkPosts(
      formState,
      setValue,
      onChangeBlur,
      platformIds,
      postFormats,
      formState.platformFilter,
      cards,
    );

    if (!isValid) {
      toast({
        variant: "error",
        title: t("toasts.create_order.post.empty_error"),
      });
    }
  };
  console.log("formState", formState);

  return (
    <div id="post" className={`container ${isBlur ? "blur" : ""}`}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.title}>
              <span className="gradient_color">2</span>
              <p className="gradient_color">{t("create_order.create.title")}</p>
            </div>
            {/* <PostGeneration /> */}
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
                    maxLength={POST.COMMENT_LENGTH}
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
                <RenderDisplay formState={formState} />
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
                    className={`max-w-[300px] gap-0 bg-transparent grid items-center justify-center shadow-none border-0 ${screen > 475 ? "w-[50vw]" : "w-[60vw]"}`}
                  >
                    <AlertDialogDescription className="sr-only"></AlertDialogDescription>
                    <AlertDialogTitle className="sr-only"></AlertDialogTitle>
                    <div className="relative">
                      <AlertDialogAction>
                        <X className="absolute -right-8 -top-4 w-[30px] rounded-full p-1 bg-white cursor-pointer" />
                      </AlertDialogAction>
                      <RenderDisplay formState={formState} />
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
