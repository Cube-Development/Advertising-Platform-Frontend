import {
  ContentType,
  getContentType,
  ICreatePost,
  ICreatePostForm,
  useGetUploadLinkMutation,
} from "@entities/project";
import { getFileExtension } from "@shared/utils";

export const useUploadFilesAndMedia = () => {
  const [getUploadLink] = useGetUploadLinkMutation();

  const handlePreparePost = async (post: ICreatePost) => {
    if (!post.content) post.content = [];

    if (post.buttons) post.content.push(...post.buttons);

    if (post.text) post.content.push(...post.text);

    return post;
  };

  const handleUploadFiles = async (post: ICreatePost) => {
    if (!post.files) return;

    if (!post.content) post.content = [];

    const uploads =
      post.files.map(async (file) => {
        const data = await getUploadLink({
          extension: getFileExtension(file),
          content_type: ContentType.file,
        }).unwrap();
        await fetch(data?.url, {
          method: "PUT",
          body: file,
        });
        post.content!.push({
          content_type: ContentType.file,
          content: data.file_name,
          name: file.name,
        });
      }) || [];

    await Promise.all(uploads);
  };

  const handleUploadMedia = async (post: ICreatePost) => {
    if (!post.media) return;

    const uploads =
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
        post.content!.push({
          content_type: getContentType(media),
          content: data.file_name,
          name: media.name,
        });
      }) || [];

    await Promise.all(uploads);
  };

  const uploadFilesAndMedia = async (formData: ICreatePostForm) => {
    const uploads = (
      formData?.isMultiPost && formData?.multiposts
        ? formData.multiposts
        : formData.posts
    )!.map(async (post) => {
      await handlePreparePost(post);
      await handleUploadFiles(post);
      await handleUploadMedia(post);
    });

    await Promise.all(uploads);
  };

  return {
    uploadFilesAndMedia,
  };
};
