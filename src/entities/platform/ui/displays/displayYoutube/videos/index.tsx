import { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { EmptyPost } from "./emptyPost";
import { YoutubeMedia } from "./media";
import { YoutubeFile } from "./file/ui";
import { YoutubeComment } from "./comment/ui";
import { GetPostRes, ICreatePostForm } from "@entities/project";
import { PostTypesNum } from "@entities/platform";
import { EyeDisabledIcon } from "@shared/assets";
import { DownloadAllBtn } from "../../../utils/downloadAllBtn";
import { CopyTextBtn } from "../../../utils/copyTextBtn";
import { preparePostsData } from "@entities/platform/ui/utils";

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
  const { mediaRes, textRes, fileRes, commentRes } = preparePostsData(post);

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

  const imgRef = useRef<HTMLImageElement>(null);
  const [resizes, setResizes] = useState<{
    borderRadius: number;
    timeSize: number;
    displayTopSize: number;
    displayBottomSize: number;
    downloadIconSize: number;
    feedHeightSize: number;
  } | null>(null);

  useEffect(() => {
    const imgElement = imgRef.current;
    if (!imgElement) return;

    const updateSizes = () => {
      const imgWidth = imgElement.offsetWidth;
      setResizes({
        borderRadius: (imgWidth / 364) * 54,
        timeSize: (imgWidth / 364) * 14,
        displayTopSize: (imgWidth / 364) * 50,
        displayBottomSize: (imgWidth / 364) * 80,
        downloadIconSize: (imgWidth / 364) * 20,
        feedHeightSize: (imgWidth / 364) * 200,
      });
    };

    const observer = new ResizeObserver(updateSizes);
    observer.observe(imgElement);

    return () => observer.disconnect();
  }, [imgRef]);

  return (
    <div className={styles.screen_wrapper}>
      <div className={styles.screen}>
        <p
          className={styles.time}
          style={{ fontSize: `${resizes?.timeSize}px` }}
        >
          9:41
        </p>
        <img
          className={styles.statusbar}
          src="/images/phoneDisplay/statusbar.svg"
        />
        <img
          className={styles.dynamic}
          src="/images/phoneDisplay/dynamic.png"
        />
        <img
          ref={imgRef}
          className={styles.mockup}
          src="/images/phoneDisplay/iphonescreen.png"
        />
        {formState ? (
          <div
            className={styles.display}
            style={{
              borderRadius: `${resizes?.borderRadius}px`,
              paddingTop: `${resizes?.displayTopSize}px`,
              paddingBottom: `${resizes?.displayBottomSize}px`,
            }}
          >
            {(postText && postText[0]?.content !== "<p></p>") ||
            postMedia?.length ||
            postComment ||
            postFile?.length ? (
              <div className={styles.content}>
                <div className={styles.post}>
                  {postMedia && postMedia?.length > 0 ? (
                    <YoutubeMedia
                      medias={postMedia}
                      feedHeight={resizes?.feedHeightSize || 200}
                      iconSize={resizes?.downloadIconSize || 14}
                    />
                  ) : (
                    <div
                      className={styles.empty__photo}
                      style={{ height: `${resizes?.feedHeightSize}px` }}
                    >
                      <EyeDisabledIcon />
                      <p>No content yet...</p>
                    </div>
                  )}
                  <div
                    className={`${styles.post__text} post_pasted_link`}
                    dangerouslySetInnerHTML={{
                      __html: (postText && postText[0]?.content) || "",
                    }}
                    style={{ fontSize: `${resizes?.timeSize}px` }}
                  />
                </div>
                {postFile && postFile?.length > 0 && (
                  <YoutubeFile
                    file={postFile[0]}
                    fontSize={resizes?.timeSize || 14}
                  />
                )}
                {postComment && (
                  <YoutubeComment
                    comment={postComment}
                    fontSize={resizes?.timeSize || 14}
                  />
                )}
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
          <div
            className={styles.display}
            style={{
              borderRadius: `${resizes?.borderRadius}px`,
              paddingTop: `${resizes?.displayTopSize}px`,
              paddingBottom: `${resizes?.displayBottomSize}px`,
            }}
          >
            {(textRes && textRes !== "<p></p>") ||
            mediaRes?.length ||
            commentRes ||
            fileRes ? (
              <div className={styles.content}>
                <div className={styles.post}>
                  {mediaRes && mediaRes?.length > 0 ? (
                    <YoutubeMedia
                      mediasRes={mediaRes}
                      feedHeight={resizes?.feedHeightSize || 200}
                      iconSize={resizes?.downloadIconSize || 14}
                    />
                  ) : (
                    <div
                      className={styles.empty__photo}
                      style={{ height: `${resizes?.feedHeightSize}px` }}
                    >
                      <EyeDisabledIcon />
                      <p>No content yet...</p>
                    </div>
                  )}
                  <div
                    className={`${styles.post__text} post_pasted_link`}
                    dangerouslySetInnerHTML={{
                      __html: textRes || "",
                    }}
                    style={{ fontSize: `${resizes?.timeSize}px` }}
                  />
                </div>
                {fileRes && (
                  <YoutubeFile
                    file={fileRes}
                    fontSize={resizes?.timeSize || 14}
                  />
                )}
                {commentRes && (
                  <YoutubeComment
                    comment={commentRes}
                    fontSize={resizes?.timeSize || 14}
                  />
                )}
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
      <section className="grid grid-cols-[1fr_auto] mt-2 ml-2.5 gap-1.5">
        {(!!fileRes || !!mediaRes?.length) && (
          <DownloadAllBtn
            post={post}
            formState={formState}
            currentPost={currentPost}
          />
        )}
        {!!textRes && <CopyTextBtn text={textRes} />}
      </section>
    </div>
  );
};
