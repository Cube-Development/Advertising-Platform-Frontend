import {
  ICreatePost,
  ICreatePostForm,
  useCreatePostMutation,
  useCreateUniquePostMutation,
} from "@entities/project";
import { useToast } from "@shared/ui";
import { useTranslation } from "react-i18next";

export const useUploadPosts = () => {
  const [createPost] = useCreatePostMutation();
  const [createUniquePost] = useCreateUniquePostMutation();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleCreateUniquePost = (post: ICreatePost, projectId: string) => {
    if (!!post?.order_id) {
      const postReq = {
        files: post.content,
        comment: post?.comment,
        project_id: projectId,
        orders: [post?.order_id],
      };
      return createUniquePost(postReq)
        .unwrap()
        .catch(() => {
          toast({
            variant: "error",
            title: t("toasts.create_order.post.error"),
          });
        });
    }
  };

  const handleCreatePost = (post: ICreatePost, projectId: string) => {
    if (!!post?.post_type) {
      const postReq = {
        files: post.content,
        comment: post?.comment,
        project_id: projectId,
        post_type: post?.post_type,
      };
      return createPost(postReq)
        .unwrap()
        .catch(() => {
          toast({
            variant: "error",
            title: t("toasts.create_order.post.error"),
          });
        });
    }
  };

  const uploadPosts = async (formData: ICreatePostForm, projectId: string) => {
    const isMulti = formData?.isMultiPost && formData?.multiposts;
    const posts = isMulti ? formData.multiposts! : formData.posts!;

    const uploads = posts.map(async (post) => {
      return isMulti
        ? await handleCreateUniquePost(post, projectId)
        : await handleCreatePost(post, projectId);
    });

    await Promise.all(uploads);
  };

  return {
    uploadPosts,
  };
};
