import { Dispatch } from "@reduxjs/toolkit";
import { PostTypesNum, platformTypesNum } from "@shared/config/platformTypes";
import { platformTypes } from "@shared/config/postFilter";
import { filterSlice } from "@shared/store/reducers";
import { ICreatePostForm, IPostChannel } from "@shared/types/createPost";
import { ICreateOrderBlur, IPlatformLink } from "@shared/types/platform";
import { UseFormSetValue } from "react-hook-form";

export const checkPosts = (
  formState: ICreatePostForm,
  setValue: UseFormSetValue<ICreatePostForm>,
  onChangeBlur: (key: keyof ICreateOrderBlur) => void,
  platformIds: number[],
  postFormats: { platform: platformTypesNum; post_types: PostTypesNum[] }[],
  selectedPlatform: IPlatformLink,
  dispatch: Dispatch<any>,
  cards: IPostChannel[],
) => {
  const changeSelectedPlatform = (type: platformTypesNum) => {
    const findedPlatform = platformTypes.find(
      (platform) => platform.id === type,
    );
    findedPlatform &&
      dispatch(filterSlice.actions.setPlatformFilter(findedPlatform));
  };
  const changeSelectedPostType = (type: PostTypesNum) => {
    setValue("selectedPostType", type);
  };
  const changeSelectedOrder = (id: string) => {
    setValue("selectedMultiPostId", id);
  };

  if (formState?.isMultiPost) {
    if (
      formState?.multiposts &&
      cards.length === formState?.multiposts.length &&
      formState.multiposts?.length > 0 &&
      formState?.multiposts.every(
        (post) =>
          post.comment !== undefined ||
          post.media !== undefined ||
          post.files !== undefined ||
          post.buttons !== undefined ||
          post.text !== undefined ||
          post.content !== undefined,
      )
    ) {
      onChangeBlur("datetime");
    } else {
      const currentPlatformIndex = platformIds.indexOf(selectedPlatform.id);
      const nextPlatformIndex = (currentPlatformIndex + 1) % platformIds.length;
      const nextPlatform = platformIds[nextPlatformIndex];

      const allPostsOfCurrentPlatform =
        formState.multiposts?.filter(
          (post) => post.platform === selectedPlatform.id,
        ) || [];

      const validPostsOfCurrentPlatform = allPostsOfCurrentPlatform.filter(
        (post) =>
          post.comment !== undefined ||
          post.media !== undefined ||
          post.files !== undefined ||
          post.buttons !== undefined ||
          post.text !== undefined ||
          post.content !== undefined,
      );

      if (
        validPostsOfCurrentPlatform.length === allPostsOfCurrentPlatform.length
      ) {
        changeSelectedPlatform(nextPlatform);
      } else {
        const selectedPostTypePosts = formState?.multiposts?.filter(
          (post) =>
            post?.post_type === formState?.selectedPostType &&
            post?.platform === selectedPlatform?.id,
        );
        const validSelectedPostTypePosts = selectedPostTypePosts?.filter(
          (post) =>
            post.comment !== undefined ||
            post.media !== undefined ||
            post.files !== undefined ||
            post.buttons !== undefined ||
            post.text !== undefined ||
            post.content !== undefined,
        );
        const nextPost = selectedPostTypePosts?.find(
          (post) => post?.order_id !== formState?.selectedMultiPostId,
        );
        if (
          selectedPostTypePosts?.length !==
            validSelectedPostTypePosts?.length &&
          nextPost?.order_id
        ) {
          changeSelectedOrder(nextPost?.order_id);
        } else {
          const currentPostFormats = postFormats.find(
            (format) => format.platform === selectedPlatform.id,
          );

          if (currentPostFormats) {
            const allPostTypesOfCurrentPlatform = currentPostFormats.post_types;
            const currentPostTypeIndex = allPostTypesOfCurrentPlatform.indexOf(
              formState?.selectedPostType,
            );
            const nextPostTypeIndex =
              (currentPostTypeIndex + 1) % allPostTypesOfCurrentPlatform.length;
            const nextPostType =
              allPostTypesOfCurrentPlatform[nextPostTypeIndex];

            changeSelectedPostType(nextPostType);
          }
        }
      }
    }
  } else {
    if (
      formState?.posts &&
      formState.posts?.length > 0 &&
      formState?.posts.every(
        (post) =>
          post.comment !== undefined ||
          post.media !== undefined ||
          post.files !== undefined ||
          post.buttons !== undefined ||
          post.text !== undefined ||
          post.content !== undefined,
      )
    ) {
      onChangeBlur("datetime");
    } else {
      const currentPlatformIndex = platformIds.indexOf(selectedPlatform.id);
      const nextPlatformIndex = (currentPlatformIndex + 1) % platformIds.length;
      const nextPlatform = platformIds[nextPlatformIndex];

      const allPostsOfCurrentPlatform =
        formState.posts?.filter(
          (post) => post.platform === selectedPlatform.id,
        ) || [];

      const validPostsOfCurrentPlatform = allPostsOfCurrentPlatform.filter(
        (post) =>
          post.comment !== undefined ||
          post.media !== undefined ||
          post.files !== undefined ||
          post.buttons !== undefined ||
          post.text !== undefined ||
          post.content !== undefined,
      );

      if (
        validPostsOfCurrentPlatform.length === allPostsOfCurrentPlatform.length
      ) {
        changeSelectedPlatform(nextPlatform);
      } else {
        const currentPostFormats = postFormats.find(
          (format) => format.platform === selectedPlatform.id,
        );

        if (currentPostFormats) {
          const allPostTypesOfCurrentPlatform = currentPostFormats.post_types;
          const currentPostTypeIndex = allPostTypesOfCurrentPlatform.indexOf(
            formState?.selectedPostType,
          );
          const nextPostTypeIndex =
            (currentPostTypeIndex + 1) % allPostTypesOfCurrentPlatform.length;
          const nextPostType = allPostTypesOfCurrentPlatform[nextPostTypeIndex];

          changeSelectedPostType(nextPostType);
        }
      }
    }
  }
};
