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

export const useGetUniversalPosts = ({ form, posts, skip }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [processedPosts, setProcessedPosts] = useState<
    ICreatePost[] | undefined
  >(undefined);

  const orders = useMemo(
    () => posts.filter((post) => post.match_type === MatchTypesNum.universal),
    [posts],
  );

  useEffect(() => {
    if (skip) {
      setProcessedPosts([]);
      setIsLoading(false);
      return;
    } else {
      if (orders?.length) {
        const process = async () => {
          setIsLoading(true);
          try {
            // Этап 1: Обработка текстовых данных
            const textDataUpdatedPosts = (form?.posts || []).map((formPost) => {
              const backPost = posts.find(
                (post) => post.match_type === MatchTypesNum.universal,
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
            });

            setProcessedPosts(textDataUpdatedPosts);

            // Этап 2: Загрузка файлов
            const postsWithFiles = await Promise.all(
              textDataUpdatedPosts.map(async (formPost) => {
                const backPost = posts.find(
                  (post) => post.match_type === MatchTypesNum.universal,
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

            setProcessedPosts(postsWithFiles);
          } catch (error) {
            console.log("Error download universal posts: ", error);
          }
          setIsLoading(false);
        };

        process();
      }
    }
  }, [posts?.length, form?.posts?.length, skip]);

  return { data: processedPosts, isLoading };
};
