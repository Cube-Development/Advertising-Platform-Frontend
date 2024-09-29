import { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { EmptyPost } from "./emptyPost";
import { InstagramMedia } from "./media";
import { InstagramFile } from "./file";
import { InstagramComment } from "./comment";
import { Heart, Send } from "lucide-react";
import { ContentType, GetPostRes, ICreatePostForm } from "@entities/project";
import { PostTypesNum } from "@entities/platform";
import { EyeDisabledIcon } from "@shared/assets";

interface DisplayStoriesProps {
  formState?: ICreatePostForm;
  platformId: number;
  post?: GetPostRes;
  postType?: PostTypesNum;
  orderId?: string;
}

export const DisplayStories: FC<DisplayStoriesProps> = ({
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

  const imgRef = useRef<HTMLImageElement>(null);
  const [resizes, setResizes] = useState<{
    borderRadius: number;
    timeSize: number;
    channelNameSize: number;
    channelIconSize: number;
    displayTopSize: number;
    displayBottomSize: number;
    downloadIconSize: number;
    storiesHeightSize: number;
  } | null>(null);

  useEffect(() => {
    const updateSizes = () => {
      if (imgRef.current) {
        const imgWidth = imgRef.current.offsetWidth;

        const calculatedRadius = (imgWidth / 364) * 54;
        const calculatedTimeSize = (imgWidth / 364) * 14;
        const calculatedChannelNameSize = (imgWidth / 364) * 10;
        const calculatedChannelIconSize = (imgWidth / 364) * 20;
        const calculatedDisplayTopSize = (imgWidth / 364) * 50;
        const calculatedDisplayBottomSize = (imgWidth / 364) * 80;
        const calculatedDownloadIconSize = (imgWidth / 364) * 14;
        const calculatedStoriesHeightSize = (imgWidth / 364) * 600;

        // Обновляем все значения в состоянии
        setResizes({
          borderRadius: calculatedRadius,
          timeSize: calculatedTimeSize,
          channelNameSize: calculatedChannelNameSize,
          channelIconSize: calculatedChannelIconSize,
          displayTopSize: calculatedDisplayTopSize,
          displayBottomSize: calculatedDisplayBottomSize,
          downloadIconSize: calculatedDownloadIconSize,
          storiesHeightSize: calculatedStoriesHeightSize,
        });
      }
    };

    setTimeout(() => {
      updateSizes();
    }, 100);

    window.addEventListener("resize", updateSizes);

    return () => {
      window.removeEventListener("resize", updateSizes);
    };
  }, [imgRef.current?.offsetWidth]);

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
        <div className={styles.footer}>
          <p
            className={styles.footer__send_msg}
            style={{ fontSize: `${resizes?.channelNameSize}px` }}
          >
            Send message...
          </p>
          <div className={styles.footer__icons}>
            <Heart
              strokeWidth="1.5px"
              stroke="#fff"
              width={
                (resizes?.channelIconSize && resizes?.channelIconSize + 4) || 18
              }
              height={
                (resizes?.channelIconSize && resizes?.channelIconSize + 4) || 18
              }
            />
            <Send
              strokeWidth="1.5px"
              stroke="#fff"
              width={
                (resizes?.channelIconSize && resizes?.channelIconSize + 4) || 18
              }
              height={
                (resizes?.channelIconSize && resizes?.channelIconSize + 4) || 18
              }
            />
          </div>
        </div>
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
                  <div className={styles.head}>
                    <div className={styles.account}>
                      <div
                        className={styles.account__avatar}
                        style={{
                          width: `${resizes?.channelIconSize}px`,
                          height: `${resizes?.channelIconSize}px`,
                        }}
                      ></div>
                      <p
                        className={styles.account__name}
                        style={{ fontSize: `${resizes?.channelNameSize}px` }}
                      >
                        Channel
                      </p>
                    </div>
                  </div>
                  {postMedia && postMedia?.length > 0 ? (
                    <InstagramMedia
                      medias={postMedia}
                      storiesHeight={resizes?.storiesHeightSize || 600}
                      iconSize={resizes?.downloadIconSize || 14}
                    />
                  ) : (
                    <div
                      className={styles.empty__photo}
                      style={{ height: `${resizes?.storiesHeightSize}px` }}
                    >
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
                      style={{ fontSize: `${resizes?.timeSize}px` }}
                    />
                  )}
                </div>
                {postFile?.length && (
                  <InstagramFile
                    file={postFile[0]}
                    fontSize={resizes?.timeSize || 14}
                  />
                )}
                {postComment && (
                  <InstagramComment
                    comment={postComment}
                    fontSize={resizes?.timeSize || 14}
                  />
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
            {(textRes && textRes[0] !== "<p></p>") ||
            mediaRes?.length ||
            commentRes ||
            fileRes ? (
              <div className={styles.content}>
                <div className={styles.post}>
                  <div className={styles.head}>
                    <div className={styles.account}>
                      <div
                        className={styles.account__avatar}
                        style={{
                          width: `${resizes?.channelIconSize}px`,
                          height: `${resizes?.channelIconSize}px`,
                        }}
                      ></div>
                      <p
                        className={styles.account__name}
                        style={{ fontSize: `${resizes?.channelNameSize}px` }}
                      >
                        Channel
                      </p>
                    </div>
                  </div>
                  {mediaRes && mediaRes?.length > 0 ? (
                    <InstagramMedia
                      mediasRes={mediaRes}
                      storiesHeight={resizes?.storiesHeightSize || 600}
                      iconSize={resizes?.downloadIconSize || 14}
                    />
                  ) : (
                    <div
                      className={styles.empty__photo}
                      style={{ height: `${resizes?.storiesHeightSize}px` }}
                    >
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
                      style={{ fontSize: `${resizes?.timeSize}px` }}
                    />
                  )}
                </div>
                {fileRes && (
                  <InstagramFile
                    file={fileRes}
                    fontSize={resizes?.timeSize || 14}
                  />
                )}
                {commentRes && (
                  <InstagramComment
                    comment={commentRes}
                    fontSize={resizes?.timeSize || 14}
                  />
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
