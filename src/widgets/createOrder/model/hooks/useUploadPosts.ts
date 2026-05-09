import {
  ICreatePost,
  ICreatePostForm,
  useCreatePostMutation,
  useCreateUniquePostMutation,
} from "@entities/project";
import { getMultipostGroupKey } from "@entities/project";
import { useToast } from "@shared/ui";
import { useTranslation } from "react-i18next";

export const useUploadPosts = () => {
  const [createPost] = useCreatePostMutation();
  const [createUniquePost] = useCreateUniquePostMutation();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleCreateUniquePost = (
    post: ICreatePost,
    projectId: string,
    orderIds: string[],
  ) => {
    if (!orderIds.length) return;
    const postReq = {
      files: post.content,
      comment: post?.comment,
      project_id: projectId,
      orders: orderIds,
    };
    return createUniquePost(postReq)
      .unwrap()
      .catch(() => {
        toast({
          variant: "error",
          title: t("toasts.create_order.post.error"),
        });
      });
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

    if (isMulti) {
      const byGroup = new Map<
        string,
        { post: ICreatePost; orderIds: string[] }
      >();
      for (const post of posts) {
        const key = getMultipostGroupKey(post);
        if (!key) continue;
        if (!byGroup.has(key)) {
          byGroup.set(key, { post, orderIds: [] });
        }
        if (post.order_id) {
          const bucket = byGroup.get(key)!;
          if (!bucket.orderIds.includes(post.order_id)) {
            bucket.orderIds.push(post.order_id);
          }
        }
      }
      await Promise.all(
        [...byGroup.values()].map(({ post, orderIds }) =>
          handleCreateUniquePost(post, projectId, orderIds),
        ),
      );
      return;
    }

    await Promise.all(
      posts.map(async (post) => handleCreatePost(post, projectId)),
    );
  };

  return {
    uploadPosts,
  };
};
