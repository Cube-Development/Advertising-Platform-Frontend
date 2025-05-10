import { platformTypes, platformTypesStr } from "@entities/platform";
import {
  CreatePostFormData,
  ICreatePostForm,
  IManagerOrderPost,
  IPostChannel,
  POST,
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
import { ICreateOrderBlur } from "@widgets/createOrder/model";
import clsx from "clsx";
import { Loader, X } from "lucide-react";
import { FC, useEffect } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  MultiPostsList,
  PlatformFilter,
  PostTypesTabs,
  RenderDisplay,
  TypeRenderEditor,
  TypeTabs,
} from "../components";
import {
  checkPosts,
  getFormUniquePosts,
  getFormUniversalPost,
  getPlatformIds,
  getPostFormats,
  useGetUniquePosts,
  useGetUniversalPosts,
} from "../model";
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

  const PLATFORM_IDS = getPlatformIds(cards);
  const PLATFORM_FORMATS = getPostFormats(cards);
  const POST_TYPE = formState?.selectedMultiPostId
    ? CreatePostFormData.multiposts
    : CreatePostFormData.posts;

  useEffect(() => {
    setValue("posts", getFormUniversalPost(cards));
    setValue("multiposts", getFormUniquePosts(cards));
  }, []);

  const {
    data: uniquePosts,
    isLoading: isLoadingUnique,
    isMultiPost,
  } = useGetUniquePosts({
    form: formState,
    posts,
    skip: !formState?.multiposts?.length || !posts?.length,
  });

  const { data: universalPosts, isLoading: isLoadingUniversal } =
    useGetUniversalPosts({
      form: { ...formState },
      posts,
      skip: !formState?.posts?.length || !posts?.length,
    });

  // console.log("uniquePosts", uniquePosts);
  // // сразу сохраняем все ордеры в форму posts с учетом платформы и post_type

  // useEffect(() => {
  //   const allPostsUniversal = cards.reduce(
  //     (
  //       acc: { platform: platformTypesNum; post_type: PostTypesNum }[],
  //       card
  //     ) => {
  //       const exists = acc.find(
  //         (post) =>
  //           post?.platform === card?.platform &&
  //           post?.post_type === card?.post_type
  //       );
  //       if (!exists) {
  //         acc.push({
  //           platform: card?.platform,
  //           post_type: card?.post_type,
  //         });
  //       }
  //       return acc;
  //     },
  //     []
  //   );
  //   setValue("posts", allPostsUniversal);
  //   const allPosts = cards.map((card) => ({
  //     platform: card?.platform,
  //     post_type: card?.post_type,
  //     order_id: card?.id,
  //   }));
  //   setValue("multiposts", allPosts);
  // }, []);

  // если есть посты на стороне бека то они заполнятся внутрь формы
  // useEffect(() => {
  //   if (
  //     posts?.length &&
  //     (formState?.posts?.length || formState?.multiposts?.length)
  //   ) {
  //     const universalOrders = posts.filter(
  //       (post) => post.match_type === MatchTypesNum.universal
  //     );
  //     const uniqueOrders = posts.filter(
  //       (post) => post.match_type === MatchTypesNum.unique
  //     );
  //     const isMultiPost = !!uniqueOrders?.length;
  //     setValue("isMultiPost", isMultiPost);

  //     if (universalOrders?.length) {
  //       const processUniversalPosts = async () => {
  //         setValue("isDownloadPosts", true);

  //         // Этап 1: Обработка текстовых данных
  //         const textDataUpdatedPosts = (formState?.posts || []).map(
  //           (formPost) => {
  //             const backPost = posts.find(
  //               (post) => post.match_type === MatchTypesNum.universal
  //             );

  //             return {
  //               ...formPost,
  //               text: backPost?.files?.filter(
  //                 (el) => el?.content_type === ContentType.text
  //               ),
  //               buttons: backPost?.files?.filter(
  //                 (el) => el?.content_type === ContentType.button
  //               ),
  //               comment: backPost?.comment,
  //             };
  //           }
  //         );

  //         setValue("posts", textDataUpdatedPosts); // Устанавливаем текстовые данные

  //         // Этап 2: Загрузка файлов
  //         const postsWithFiles = await Promise.all(
  //           textDataUpdatedPosts.map(async (formPost) => {
  //             const backPost = posts.find(
  //               (post) => post.match_type === MatchTypesNum.universal
  //             );

  //             const backFiles = backPost?.files?.filter(
  //               (el) => el?.content_type === ContentType.file
  //             );
  //             const backMedia = backPost?.files?.filter((el) =>
  //               [ContentType.photo, ContentType.video].includes(
  //                 el?.content_type
  //               )
  //             );

  //             let files: File[] | undefined;
  //             let media: File[] | undefined;

  //             if (backFiles?.length) {
  //               files = await downloadAllFiles(backFiles);
  //             }
  //             if (backMedia?.length) {
  //               media = await downloadAllFiles(backMedia);
  //             }

  //             return {
  //               ...formPost,
  //               files: files,
  //               media: media,
  //             };
  //           })
  //         );

  //         setValue("posts", postsWithFiles); // Устанавливаем данные с файлами
  //         setValue("isDownloadPosts", false);
  //       };

  //       processUniversalPosts();
  //     }

  //     if (uniqueOrders?.length) {
  //       const processUniquePosts = async () => {
  //         setValue("isDownloadPosts", true);

  //         // Этап 1: Обработка текстовых данных
  //         const textDataUpdatedMultiposts = (formState?.multiposts || []).map(
  //           (formPost) => {
  //             const backPost = posts.find(
  //               (post) =>
  //                 post.match_type === MatchTypesNum.unique &&
  //                 !!post.orders.find(
  //                   (order) => order.order_id === formPost.order_id
  //                 )
  //             );

  //             return {
  //               ...formPost,
  //               text: backPost?.files?.filter(
  //                 (el) => el?.content_type === ContentType.text
  //               ),
  //               buttons: backPost?.files?.filter(
  //                 (el) => el?.content_type === ContentType.button
  //               ),
  //               comment: backPost?.comment,
  //             };
  //           }
  //         );

  //         setValue("multiposts", textDataUpdatedMultiposts); // Устанавливаем текстовые данные

  //         // Этап 2: Загрузка файлов
  //         const multipostsWithFiles = await Promise.all(
  //           textDataUpdatedMultiposts.map(async (formPost) => {
  //             const backPost = posts.find(
  //               (post) =>
  //                 post.match_type === MatchTypesNum.unique &&
  //                 !!post.orders.find(
  //                   (order) => order.order_id === formPost.order_id
  //                 )
  //             );

  //             const backFiles = backPost?.files?.filter(
  //               (el) => el?.content_type === ContentType.file
  //             );
  //             const backMedia = backPost?.files?.filter((el) =>
  //               [ContentType.photo, ContentType.video].includes(
  //                 el?.content_type
  //               )
  //             );

  //             let files: File[] | undefined;
  //             let media: File[] | undefined;

  //             if (backFiles?.length) {
  //               files = await downloadAllFiles(backFiles);
  //             }
  //             if (backMedia?.length) {
  //               media = await downloadAllFiles(backMedia);
  //             }

  //             return {
  //               ...formPost,
  //               files: files,
  //               media: media,
  //             };
  //           })
  //         );

  //         setValue("multiposts", multipostsWithFiles); // Устанавливаем данные с файлами
  //         setValue("isDownloadPosts", false);
  //       };

  //       processUniquePosts();
  //     }
  //   }
  // }, [posts?.length, formState?.posts?.length, formState?.multiposts?.length]);

  useEffect(() => {
    setValue("isDownloadPosts", isLoadingUniversal);

    if (universalPosts?.length) {
      setValue("posts", universalPosts);
    }
  }, [isLoadingUniversal, universalPosts]);

  useEffect(() => {
    setValue("isDownloadPosts", isLoadingUnique);
    setValue("isMultiPost", isMultiPost);

    if (uniquePosts?.length) {
      setValue("multiposts", uniquePosts);
    }
  }, [isLoadingUnique, uniquePosts, isMultiPost]);

  const handleCheckPosts = async () => {
    const isValid = checkPosts(
      formState,
      setValue,
      onChangeBlur,
      PLATFORM_IDS,
      PLATFORM_FORMATS,
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
              platforms={PLATFORM_IDS}
              setValue={setValue}
              formats={PLATFORM_FORMATS}
              platformFilter={formState.platformFilter}
            />
            <PostTypesTabs
              selectedPlatform={formState?.platformFilter?.id}
              selectedPostType={formState?.selectedPostType}
              setValue={setValue}
              formats={PLATFORM_FORMATS}
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
                  <TypeRenderEditor formState={formState} setValue={setValue} />
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
                    type={POST_TYPE}
                  />
                  {formState.platformFilter?.type ===
                    platformTypesStr.telegram && (
                    <PostButtons
                      setValue={setValue}
                      formState={formState}
                      platformId={formState?.platformFilter?.id}
                      type={POST_TYPE}
                    />
                  )}
                  <PostComment
                    placeholder={"create_order.create.comment"}
                    maxLength={POST.COMMENT_LENGTH}
                    rows={4}
                    setValue={setValue}
                    type={POST_TYPE}
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
                    <button
                      className={styles.see_post_btn}
                      type="button"
                      disabled={formState?.isDownloadPosts}
                    >
                      <p>{t("create_order.create.see_post_mobile_btn")}</p>
                      <div className={styles.icon}>
                        {formState?.isDownloadPosts ? (
                          <Loader
                            className="animate-spin"
                            stroke="var(--Personal-colors-main)"
                            width={20}
                            height={20}
                          />
                        ) : (
                          <PostIcon />
                        )}
                      </div>
                    </button>
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
