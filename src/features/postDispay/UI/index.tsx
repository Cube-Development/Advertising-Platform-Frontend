import { FC } from "react";
import styles from "./styles.module.scss";
import { ICreatePostForm } from "@shared/types/createPost";
import { ContentType } from "@shared/config/createPostData";
import { PostPhotos } from "./postPhotos";
import { EmptyPost } from "./emptyPost";

interface PostDispayProps {
  formState: ICreatePostForm;
  platformId: number;
}

export const PostDispay: FC<PostDispayProps> = ({ formState, platformId }) => {
  const currentPost = formState.posts.find(
    (item) => item.platform === platformId,
  );
  const postText = currentPost?.files?.find(
    (file) => file.content_type === ContentType.text,
  );
  const postPhotos = currentPost?.files?.filter(
    (file) => file.content_type === ContentType.photo,
  );
  const postVideo = currentPost?.files?.find(
    (file) => file.content_type === ContentType.video,
  );
  return (
    <div className={styles.wrapper}>
      {(postText && postText?.content !== "<p></p>") ||
      postPhotos?.length ||
      postVideo ? (
        <div className={styles.content}>
          {postPhotos && postPhotos?.length > 0 && (
            <PostPhotos photos={postPhotos} />
          )}
          {postVideo && <video src={postVideo.content} />}
          {postText && (
            <div
              dangerouslySetInnerHTML={{
                __html: postText?.content || "",
              }}
              className={styles.current_post}
            />
          )}
        </div>
      ) : (
        <EmptyPost />
      )}
    </div>
  );
};
