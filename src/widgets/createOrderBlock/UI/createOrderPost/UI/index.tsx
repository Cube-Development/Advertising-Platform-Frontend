import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { PostGeneration } from "@features/postGeneration";
import { PostText } from "@features/postText";
import { PostFiles } from "@features/postFiles";
import { PostButtons } from "@features/postButtons";
import { BarPostFilter } from "@features/barPostFilter";
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
import { PostDispayTelegram } from "@features/postDispayTelegram";
import { PostDispayInstagram } from "@features/postDispayInstagram";

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

  const platformIds: number[] = [
    ...new Set(cards.map((card) => card.platform)),
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
        ...platformTypes.filter((item) => platformIds.includes(item.id)),
      ];
      const nextType =
        allTypes[(allTypes.indexOf(filter) + 1) % allTypes.length];
      toggleProfile(nextType);
    }
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
            <div className={styles.filters}>
              <BarPostFilter platforms={platformIds} />
            </div>
            <div className={styles.data}>
              <div className={styles.post_data}>
                <div className={styles.block}>
                  {filter.id === platformTypesNum.telegram && (
                    <Editor
                      setValue={setValue}
                      getValues={getValues}
                      type={CreatePostFormData.posts}
                      platformId={filter.id}
                    />
                  )}
                  {filter.id === platformTypesNum.instagram && (
                    <Editor
                      setValue={setValue}
                      getValues={getValues}
                      type={CreatePostFormData.posts}
                      platformId={filter.id}
                    />
                  )}
                  {filter.id === platformTypesNum.youtube && (
                    <Editor
                      setValue={setValue}
                      getValues={getValues}
                      type={CreatePostFormData.posts}
                      platformId={filter.id}
                    />
                  )}
                </div>
                <div
                  className={`${styles.block__bottom} ${filter.type !== platformTypesStr.telegram ? styles.filter : ""}`}
                >
                  <PostFiles
                    AddFiles={AddFiles}
                    AddMediaFiles={AddMediaFiles}
                    setValue={setValue}
                    getValues={getValues}
                    platformId={filter.id}
                  />
                  {filter.type === platformTypesStr.telegram && (
                    <PostButtons
                      getValues={getValues}
                      setValue={setValue}
                      platformId={filter.id}
                    />
                  )}
                  <PostText
                    placeholder={"create_order.create.comment"}
                    maxLength={POST.commentLength}
                    rows={4}
                    setValue={setValue}
                    type={CreatePostFormData.posts}
                    getValues={getValues}
                    platformId={filter.id}
                  />
                </div>
              </div>
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
