import { MatchTypesNum } from "@entities/platform";
import {
  ContentType,
  ICreatePost,
  ICreatePostForm,
  IManagerOrderPost,
} from "@entities/project";
import { useEffect, useMemo, useState } from "react";
import { downloadAllFiles } from "../helpers";

interface Props {
  form: ICreatePostForm;
  posts: IManagerOrderPost[];
  skip: boolean;
}

export const useGetUniquePosts = ({ form, posts, skip }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [processedPosts, setProcessedPosts] = useState<ICreatePost[]>([]);

  const orders = useMemo(
    () => posts.filter((post) => post.match_type === MatchTypesNum.unique),
    [posts],
  );
  const isMultiPost = useMemo(() => !!orders.length, [orders]);

  useEffect(() => {
    if (skip) {
      setProcessedPosts([]);
      setIsLoading(false);
      return;
    } else {
      if (orders?.length) {
        const process = async () => {
          setIsLoading(true);

          // Этап 1: Обработка текстовых данных
          const textDataUpdatedMultiPosts = (form?.multiposts || []).map(
            (formPost) => {
              const backPost = posts.find(
                (post) =>
                  post.match_type === MatchTypesNum.unique &&
                  !!post.orders.find(
                    (order) => order.order_id === formPost.order_id,
                  ),
              );

              const text = backPost?.files?.filter(
                (el) => el?.content_type === ContentType.text,
              );
              const buttons = backPost?.files?.filter(
                (el) => el?.content_type === ContentType.button,
              );
              const comment = backPost?.comment;

              return {
                ...formPost,
                buttons,
                text,
                comment,
              };
            },
          );

          // Этап 2: Загрузка файлов
          const multiPostsWithFiles = await Promise.all(
            textDataUpdatedMultiPosts.map(async (formPost) => {
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
                files,
                media,
              };
            }),
          );

          setIsLoading(false);
          setProcessedPosts(multiPostsWithFiles);
        };

        process();
      }
    }
  }, [posts?.length, form?.multiposts?.length, skip]);

  return { data: processedPosts, isLoading, isMultiPost };
};
