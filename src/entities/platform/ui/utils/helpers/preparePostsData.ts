import { ContentType, GetPostRes, IFile } from "@entities/project";

export const preparePostsData = (post?: GetPostRes) => {
  const photosRes: IFile[] =
    post?.files?.filter((el) => el.content_type === ContentType.photo) || [];
  const videosRes =
    post?.files?.filter((el) => el.content_type === ContentType.video) || [];
  const mediaRes: IFile[] = [...photosRes, ...videosRes];
  const textRes: string =
    post?.files?.find((el) => el.content_type === ContentType.text)?.content ||
    "";
  const fileRes: IFile | undefined = post?.files?.find(
    (el) => el.content_type === ContentType.file,
  );
  const buttonsRes: IFile[] =
    post?.files?.filter((el) => el.content_type === ContentType.button) || [];
  const commentRes = post?.comment || "";

  return {
    photosRes,
    videosRes,
    mediaRes,
    textRes,
    fileRes,
    buttonsRes,
    commentRes,
  };
};
