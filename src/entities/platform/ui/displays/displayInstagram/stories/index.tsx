import { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { EmptyPost } from "./emptyPost";
import { InstagramMedia } from "./media";
import { InstagramFile } from "./file";
import { InstagramComment } from "./comment";
import { Heart, Send } from "lucide-react";
import { GetPostRes, ICreatePostForm } from "@entities/project";
import { PostTypesNum } from "@entities/platform";
import { EyeDisabledIcon } from "@shared/assets";
import { DownloadAllBtn } from "../../../utils/downloadAllBtn";
import { CopyTextBtn } from "../../../utils/copyTextBtn";
import { preparePostsData } from "@entities/platform/ui/utils";

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
    channelNameSize: number;
    channelIconSize: number;
    displayTopSize: number;
    displayBottomSize: number;
    downloadIconSize: number;
    storiesHeightSize: number;
  } | null>(null);

  useEffect(() => {
    const imgElement = imgRef.current;
    if (!imgElement) return;

    const updateSizes = () => {
      const imgWidth = imgElement.offsetWidth;
      setResizes({
        borderRadius: (imgWidth / 364) * 54,
        timeSize: (imgWidth / 364) * 14,
        channelNameSize: (imgWidth / 364) * 10,
        channelIconSize: (imgWidth / 364) * 20,
        displayTopSize: (imgWidth / 364) * 50,
        displayBottomSize: (imgWidth / 364) * 80,
        downloadIconSize: (imgWidth / 364) * 20,
        storiesHeightSize: (imgWidth / 364) * 600,
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
                  <div
                    className={`${styles.post__text} post_pasted_link`}
                    dangerouslySetInnerHTML={{
                      __html: (postText && postText[0]?.content) || "",
                    }}
                    style={{ fontSize: `${resizes?.timeSize}px` }}
                  />
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
            {(textRes && textRes !== "<p></p>") ||
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
                  <div
                    className={`${styles.post__text} post_pasted_link`}
                    dangerouslySetInnerHTML={{
                      __html: textRes || "",
                    }}
                    style={{ fontSize: `${resizes?.timeSize}px` }}
                  />
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
