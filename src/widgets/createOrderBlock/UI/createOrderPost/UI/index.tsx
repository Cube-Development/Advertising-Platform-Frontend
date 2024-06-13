import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { PostGeneration } from "@features/postGeneration";
import { PostText } from "@features/postText";
import { PostFiles } from "@features/postFiles";
import { PostButtons } from "@features/postButtons";
import { ICreatePostForm, IPostChannel } from "@shared/types/createPost";
import { AddFiles } from "@features/addFiles";
import { AddMediaFiles } from "@features/addMediaFiles";
import { ICreateOrderBlur, IPlatformLink } from "@shared/types/platform";
import { useAppDispatch, useAppSelector } from "@shared/store";
import { platformTypes } from "@shared/config/postFilter";
import {
  platformTypesNum,
  platformTypesStr,
} from "@shared/config/platformTypes";
import { POST } from "@shared/config/common";
import { CreatePostFormData } from "@shared/config/createPostData";
import { ContinueOrder } from "@features/continueOrder";
import { filterSlice } from "@shared/store/reducers";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { Editor } from "@features/postEditor";
import {
  PostDispayInstagram,
  PostDispayTelegram,
} from "@shared/ui/postDisplay";
import clsx from "clsx";
import { MultiPostsList } from "../multiPostsList";
import { PlatformFilter } from "../platformFilter";

interface CreateOrderPostProps {
  cards: IPostChannel[];
  isBlur?: boolean;
  onChangeBlur: (key: keyof ICreateOrderBlur) => void;
  setValue: UseFormSetValue<ICreatePostForm>;
  getValues: UseFormGetValues<ICreatePostForm>;
  formState: ICreatePostForm;
  isMultiPost: boolean;
  setIsMultiPost: () => void;
}

export const CreateOrderPost: FC<CreateOrderPostProps> = ({
  cards,
  isBlur,
  onChangeBlur,
  setValue,
  getValues,
  formState,
  isMultiPost,
  setIsMultiPost,
}) => {
  const { t } = useTranslation();

  const platformIds: number[] = [
    ...new Set(cards?.map((card) => card?.platform)),
  ];

  const { platformFilter: filter } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  const toggleProfile = (type: IPlatformLink) => {
    dispatch(filterSlice.actions.setPlatformFilter(type));
  };

  const handleCheckPosts = () => {
    if (platformIds.length === formState.posts?.length) {
      onChangeBlur("datetime");
    } else {
      const allTypes = [
        ...platformTypes.filter((item) => platformIds.includes(item?.id)),
      ];
      const nextType =
        allTypes[(allTypes.indexOf(filter) + 1) % allTypes.length];
      toggleProfile(nextType);
    }
  };

  const renderEditor = (platformId: number) =>
    formState?.selectedMultiPostId ? (
      formState?.multiposts?.map(
        (post) =>
          post?.order_id === formState?.selectedMultiPostId && (
            <Editor
              setValue={setValue}
              type={
                formState?.selectedMultiPostId
                  ? CreatePostFormData.multiposts
                  : CreatePostFormData.posts
              }
              platformId={platformId}
              formState={formState}
            />
          )
      )
    ) : (
      <Editor
        setValue={setValue}
        type={
          formState?.selectedMultiPostId
            ? CreatePostFormData.multiposts
            : CreatePostFormData.posts
        }
        platformId={platformId}
        formState={formState}
      />
    );

  return (
    <div
      onClick={() => console.log(formState)}
      id="post"
      className={`container ${isBlur ? "blur" : ""}`}
    >
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
            <ul className={styles.post_type_filter}>
              <li
                className={clsx("", { [styles.active__type]: !isMultiPost })}
                onClick={() => {
                  setIsMultiPost();
                  setValue("selectedMultiPostId", null);
                }}
              >
                {t("create_order.create.universal_post")}
              </li>
              <li
                className={clsx("", { [styles.active__type]: isMultiPost })}
                onClick={setIsMultiPost}
              >
                {t("create_order.create.multi_post")}
              </li>
            </ul>
            <div className={styles.filters}>
              <PlatformFilter platforms={platformIds} />
            </div>
            <div className={clsx(styles.data, {})}>
              {isMultiPost && (
                <MultiPostsList
                  platform={filter?.id}
                  orders={cards}
                  setValue={setValue}
                  getValues={getValues}
                  selectedMultiPostId={formState?.selectedMultiPostId}
                />
              )}
              <div className={styles.post_data}>
                <div className={styles.block}>
                  {filter.id === platformTypesNum.telegram &&
                    renderEditor(platformTypesNum.telegram)}
                  {filter.id === platformTypesNum.instagram &&
                    renderEditor(platformTypesNum.instagram)}
                  {filter.id === platformTypesNum.youtube &&
                    renderEditor(platformTypesNum.youtube)}
                </div>
                <div
                  className={`${styles.block__bottom} ${filter.type !== platformTypesStr.telegram ? styles.filter : ""}`}
                >
                  <PostFiles
                    AddFiles={AddFiles}
                    AddMediaFiles={AddMediaFiles}
                    setValue={setValue}
                    platformId={filter.id}
                    formState={formState}
                    type={
                      formState?.selectedMultiPostId
                        ? CreatePostFormData.multiposts
                        : CreatePostFormData.posts
                    }
                  />
                  {filter.type === platformTypesStr.telegram && (
                    <PostButtons
                      setValue={setValue}
                      formState={formState}
                      platformId={filter.id}
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
                    platformId={filter.id}
                    formState={formState}
                  />
                </div>
              </div>
              {!isMultiPost && <div></div>}
              <div className={styles.display}>
                {filter.type === platformTypesStr.telegram && (
                  <PostDispayTelegram
                    formState={formState}
                    platformId={filter.id}
                  />
                )}
                {filter.type === platformTypesStr.instagram && (
                  <PostDispayInstagram
                    formState={formState}
                    platformId={filter.id}
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
