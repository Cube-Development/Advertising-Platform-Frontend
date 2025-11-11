import { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { EmptyPost } from "./emptyPost";
import { InstagramMedia } from "./media";
import { InstagramFile } from "./file";
import { InstagramComment } from "./comment";
import { ChevronLeft, Heart, MessageCircle, Send } from "lucide-react";
import {
  AvatarIcon,
  HomeIcon,
  MarketIcon,
  ReelsIcon,
  SearchIcon,
} from "./assets";
import { GetPostRes, ICreatePostForm } from "@entities/project";
import { PostTypesNum } from "@entities/platform";
import { EyeDisabledIcon } from "@shared/assets";
import { DownloadAllBtn } from "../../../utils/downloadAllBtn";
import { CopyTextBtn } from "../../../utils/copyTextBtn";
import { preparePostsData } from "@entities/platform/ui/utils";

interface DisplayFeedProps {
  formState?: ICreatePostForm;
  platformId: number;
  post?: GetPostRes;
  postType?: PostTypesNum;
  orderId?: string;
}

export const DisplayFeed: FC<DisplayFeedProps> = ({
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
    channelPostsSize: number;
    footerIconSize: number;
    displayTopSize: number;
    displayBottomSize: number;
    downloadIconSize: number;
    feedHeightSize: number;
    avatarSize: number;
  } | null>(null);

  useEffect(() => {
    const imgElement = imgRef.current;
    if (!imgElement) return;

    const updateSizes = () => {
      const imgWidth = imgElement.offsetWidth;
      setResizes({
        borderRadius: (imgWidth / 364) * 54,
        timeSize: (imgWidth / 364) * 14,
        channelNameSize: (imgWidth / 364) * 8,
        channelPostsSize: (imgWidth / 364) * 12,
        footerIconSize: (imgWidth / 364) * 20,
        displayTopSize: (imgWidth / 364) * 80,
        displayBottomSize: (imgWidth / 364) * 60,
        downloadIconSize: (imgWidth / 364) * 20,
        feedHeightSize: (imgWidth / 364) * 300,
        avatarSize: (imgWidth / 364) * 30,
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
        <div className={styles.header}>
          <ChevronLeft />
          <div className={styles.channel}>
            <p
              className={styles.channel__name}
              style={{ fontSize: `${resizes?.channelNameSize}px` }}
            >
              Channel name
            </p>
            <p
              className={styles.channel__posts}
              style={{ fontSize: `${resizes?.channelPostsSize}px` }}
            >
              Posts
            </p>
          </div>
          <div
            className={styles.subscribe}
            style={{ fontSize: `${resizes?.channelPostsSize}px` }}
          >
            Subscribe
          </div>
        </div>
        <img
          ref={imgRef}
          className={styles.mockup}
          src="/images/phoneDisplay/iphonescreen.png"
        />
        <div className={styles.footer}>
          <HomeIcon
            width={resizes?.footerIconSize || 20}
            height={resizes?.footerIconSize || 20}
          />
          <SearchIcon
            width={resizes?.footerIconSize || 20}
            height={resizes?.footerIconSize || 20}
          />
          <ReelsIcon
            width={resizes?.footerIconSize || 20}
            height={resizes?.footerIconSize || 20}
          />
          <MarketIcon
            width={resizes?.footerIconSize || 20}
            height={resizes?.footerIconSize || 20}
          />
          <AvatarIcon
            width={resizes?.footerIconSize || 20}
            height={resizes?.footerIconSize || 20}
          />
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
                          width: `${resizes?.avatarSize}px`,
                          height: `${resizes?.avatarSize}px`,
                        }}
                      ></div>
                      <div className={styles.account__name}>
                        <p
                          className={styles.name}
                          style={{ fontSize: `${resizes?.channelPostsSize}px` }}
                        >
                          Channel
                        </p>
                        <p
                          className={styles.category}
                          style={{ fontSize: `${resizes?.channelNameSize}px` }}
                        >
                          Category
                        </p>
                      </div>
                    </div>
                    <div className={styles.head__more}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  {postMedia && postMedia?.length > 0 ? (
                    <InstagramMedia
                      medias={postMedia}
                      feedHeight={resizes?.feedHeightSize || 300}
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
                  <div className={styles.post__footer}>
                    <div className={styles.left}>
                      <Heart
                        strokeWidth="1.5px"
                        stroke="#fff"
                        width={resizes?.footerIconSize || 20}
                        height={resizes?.footerIconSize || 20}
                      />
                      <MessageCircle
                        strokeWidth="1.5px"
                        stroke="#fff"
                        width={resizes?.footerIconSize || 20}
                        height={resizes?.footerIconSize || 20}
                      />
                      <Send
                        strokeWidth="1.5px"
                        stroke="#fff"
                        width={resizes?.footerIconSize || 20}
                        height={resizes?.footerIconSize || 20}
                      />
                    </div>
                  </div>
                  <p
                    className={styles.post__likes}
                    style={{ fontSize: `${resizes?.timeSize}px` }}
                  >
                    893 likes
                  </p>
                  <div
                    className={`${styles.post__text} post_pasted_link`}
                    dangerouslySetInnerHTML={{
                      __html: (postText && postText[0]?.content) || "",
                    }}
                    style={{ fontSize: `${resizes?.timeSize}px` }}
                  />
                  <div className={styles.post__info}>
                    <p
                      className={styles.show__comments}
                      style={{ fontSize: `${resizes?.channelPostsSize}px` }}
                    >
                      Show all comments (189)
                    </p>
                    <p
                      className={styles.date}
                      style={{ fontSize: `${resizes?.channelPostsSize}px` }}
                    >
                      Now •
                    </p>
                  </div>
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
                          width: `${resizes?.avatarSize}px`,
                          height: `${resizes?.avatarSize}px`,
                        }}
                      ></div>
                      <div className={styles.account__name}>
                        <p
                          className={styles.name}
                          style={{ fontSize: `${resizes?.channelPostsSize}px` }}
                        >
                          Channel
                        </p>
                        <p
                          className={styles.category}
                          style={{ fontSize: `${resizes?.channelNameSize}px` }}
                        >
                          Category
                        </p>
                      </div>
                    </div>
                    <div className={styles.head__more}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  {mediaRes && mediaRes?.length > 0 ? (
                    <InstagramMedia
                      mediasRes={mediaRes}
                      feedHeight={resizes?.feedHeightSize || 300}
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
                  <div className={styles.post__footer}>
                    <div className={styles.left}>
                      <Heart
                        strokeWidth="1.5px"
                        stroke="#fff"
                        width={resizes?.footerIconSize || 20}
                        height={resizes?.footerIconSize || 20}
                      />
                      <MessageCircle
                        strokeWidth="1.5px"
                        stroke="#fff"
                        width={resizes?.footerIconSize || 20}
                        height={resizes?.footerIconSize || 20}
                      />
                      <Send
                        strokeWidth="1.5px"
                        stroke="#fff"
                        width={resizes?.footerIconSize || 20}
                        height={resizes?.footerIconSize || 20}
                      />
                    </div>
                  </div>
                  <p
                    className={styles.post__likes}
                    style={{ fontSize: `${resizes?.timeSize}px` }}
                  >
                    893 likes
                  </p>
                  <div
                    className={`${styles.post__text} post_pasted_link`}
                    dangerouslySetInnerHTML={{
                      __html: textRes || "",
                    }}
                    style={{ fontSize: `${resizes?.timeSize}px` }}
                  />
                  <div className={styles.post__info}>
                    <p
                      className={styles.show__comments}
                      style={{ fontSize: `${resizes?.channelPostsSize}px` }}
                    >
                      Show all comments (189)
                    </p>
                    <p
                      className={styles.date}
                      style={{ fontSize: `${resizes?.channelPostsSize}px` }}
                    >
                      Now •
                    </p>
                  </div>
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
