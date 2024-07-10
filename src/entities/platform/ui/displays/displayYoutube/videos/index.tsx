import { FC } from "react";
import styles from "./styles.module.scss";
import { EmptyPost } from "./emptyPost";
import { GetPostRes } from "@shared/store/services/getPostService";
import { YoutubeMedia } from "./media";
import { YoutubeFile } from "./file/ui";
import { YoutubeComment } from "./comment/ui";
import { ContentType, ICreatePostForm } from "@entities/project";
import { PostTypesNum } from "@entities/platform/config";
import { EyeDisabledIcon } from "@shared/assets";

interface DisplayVideosProps {
  formState?: ICreatePostForm;
  platformId: number;
  post?: GetPostRes;
  postType?: PostTypesNum;
  orderId?: string;
}

export const DisplayVideos: FC<DisplayVideosProps> = ({
  formState,
  platformId,
  post,
  postType,
  orderId,
}) => {
  // post response
  const photosRes = post
    ? [
        ...post.photo.map((photo) => ({
          content_type: ContentType.photo,
          content: photo,
        })),
      ]
    : [];
  const videosRes = post
    ? [
        ...post.video.map((video) => ({
          content_type: ContentType.video,
          content: video,
        })),
      ]
    : [];
  const mediaRes = [...photosRes, ...videosRes];
  const textRes = post && post.text;
  const fileRes = post &&
    post?.files.length > 0 && {
      content_type: ContentType.file,
      content: post.files[0],
    };
  const commentRes = post && post.comment;

  // postFromData
  const currentPost = formState?.selectedMultiPostId
    ? formState?.multiposts?.find((item) =>
        orderId
          ? item?.order_id === orderId
          : item?.order_id === formState?.selectedMultiPostId,
      ) || {
        platform: platformId,
        files: [],
        media: [],
        buttons: [],
        order_id: formState?.selectedMultiPostId,
      }
    : (formState?.posts || []).find(
        (item) => item.platform === platformId && item.post_type === postType,
      ) || {
        platform: platformId,
        files: [],
        media: [],
        buttons: [],
      };
  const postText = currentPost?.text;
  const postMedia = currentPost?.media;
  const postFile = currentPost?.files;
  const postComment = currentPost?.comment;

  return (
    <div className={styles.screen_wrapper}>
      <div className={styles.screen}>
        <p className={styles.time}>9:41</p>
        <img
          className={styles.statusbar}
          src="/images/phoneDisplay/statusbar.svg"
        />
        <img
          className={styles.dynamic}
          src="/images/phoneDisplay/dynamic.png"
        />
        <img
          className={styles.mockup}
          src="/images/phoneDisplay/iphonescreen.png"
        />
        {formState ? (
          <div className={styles.display}>
            {(postText && postText[0]?.content !== "<p></p>") ||
            postMedia?.length ||
            postComment ||
            postFile?.length ? (
              <div className={styles.content}>
                <div className={styles.post}>
                  {postMedia && postMedia?.length > 0 ? (
                    <YoutubeMedia medias={postMedia} />
                  ) : (
                    <div className={styles.empty__photo}>
                      <EyeDisabledIcon />
                      <p>No content yet...</p>
                    </div>
                  )}
                  {postText && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: postText[0]?.content || "",
                      }}
                      className={styles.post__text}
                    />
                  )}
                </div>
                {postFile && postFile?.length > 0 && (
                  <YoutubeFile file={postFile[0]} />
                )}
                {postComment && <YoutubeComment comment={postComment} />}
                {(!postText || postText[0]?.content === "<p></p>") &&
                  !postComment &&
                  (!postFile || postFile.length === 0) && (
                    <div className={styles.no_content}>
                      <EyeDisabledIcon />
                      <p>No content yet...</p>
                    </div>
                  )}
                <div className={styles.stroke}></div>
              </div>
            ) : (
              <EmptyPost />
            )}
          </div>
        ) : (
          <div className={styles.display}>
            {(textRes && textRes[0] !== "<p></p>") ||
            mediaRes?.length ||
            commentRes ||
            fileRes ? (
              <div className={styles.content}>
                <div className={styles.post}>
                  {mediaRes && mediaRes?.length > 0 ? (
                    <YoutubeMedia mediasRes={mediaRes} />
                  ) : (
                    <div className={styles.empty__photo}>
                      <EyeDisabledIcon />
                      <p>No content yet...</p>
                    </div>
                  )}
                  {textRes && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: textRes[0] || "",
                      }}
                      className={styles.post__text}
                    />
                  )}
                </div>
                {fileRes && <YoutubeFile file={fileRes} />}
                {commentRes && <YoutubeComment comment={commentRes} />}
                {!textRes && !commentRes && !fileRes && (
                  <div className={styles.no_content}>
                    <EyeDisabledIcon />
                    <p>No content yet...</p>
                  </div>
                )}
                <div className={styles.stroke}></div>
              </div>
            ) : (
              <EmptyPost />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
