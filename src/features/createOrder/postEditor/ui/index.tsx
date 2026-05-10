import { FC, useMemo, useCallback } from "react";
import { UseFormSetValue } from "react-hook-form";
import {
  CreatePostFormData,
  ICreatePostForm,
  ICreatePost,
  IFile,
} from "@entities/project";
import { PostEditor } from "@shared/ui";
import { applyMultipostUpdate } from "@entities/project";

interface EditorProps {
  setValue: UseFormSetValue<ICreatePostForm>;
  type: CreatePostFormData;
  platformId: number;
  formState: ICreatePostForm;
  disabled?: boolean;
  placeholder?: string;
}

export const Editor: FC<EditorProps> = ({
  setValue,
  type,
  platformId,
  formState,
  disabled = false,
  placeholder,
}) => {
  const postsWithoutCurrent = useMemo(
    () =>
      formState?.selectedMultiPostId
        ? formState?.multiposts?.filter(
            (item) => item?.order_id !== formState?.selectedMultiPostId,
          ) || []
        : formState?.posts?.filter(
            (item) =>
              item?.platform !== platformId ||
              (item?.platform === platformId &&
                item?.post_type !== formState?.selectedPostType),
          ) || [],
    [
      formState?.selectedMultiPostId,
      formState?.multiposts,
      formState?.posts,
      platformId,
      formState?.selectedPostType,
    ],
  );

  const currentPost = useMemo(
    () =>
      formState?.selectedMultiPostId
        ? formState?.multiposts?.find(
            (item) => item?.order_id === formState?.selectedMultiPostId,
          )
        : formState?.posts?.find(
            (item) =>
              item.platform === platformId &&
              item.post_type === formState.selectedPostType,
          ) || {
            platform: platformId,
            post_type: formState.selectedPostType,
          },
    [
      formState?.selectedMultiPostId,
      formState?.multiposts,
      formState?.posts,
      platformId,
      formState.selectedPostType,
    ],
  );

  const editorFiles = useMemo(() => {
    return (currentPost as ICreatePost)?.text || [];
  }, [currentPost]);

  const handleUpdate = useCallback(
    (updatedFiles: IFile[]) => {
      if (!currentPost) return;
      if (type === CreatePostFormData.multiposts && currentPost.order_id) {
        setValue(
          type,
          applyMultipostUpdate(
            formState.multiposts || [],
            currentPost.order_id,
            (leader) => ({
              ...leader,
              text: updatedFiles,
            }),
          ),
        );
        return;
      }
      const updatedPost = {
        ...(currentPost as ICreatePost),
        text: updatedFiles,
      };
      setValue(type, [...postsWithoutCurrent, updatedPost]);
    },
    [setValue, type, currentPost, postsWithoutCurrent, formState.multiposts],
  );

  return (
    <PostEditor
      files={editorFiles}
      onUpdate={handleUpdate}
      className="h-full"
    />
  );
};
