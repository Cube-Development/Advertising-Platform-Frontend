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
import { ContentType, GetPostRes, ICreatePostForm } from "@entities/project";
import { PostTypesNum } from "@entities/platform";
import { EyeDisabledIcon } from "@shared/assets";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { DownloadAllBtn } from "../../downloadAllBtn";

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
    channelPostsSize: number;
    footerIconSize: number;
    displayTopSize: number;
    displayBottomSize: number;
    downloadIconSize: number;
    feedHeightSize: number;
    avatarSize: number;
  } | null>(null);

  // useEffect(() => {
  //   const updateSizes = () => {
  //     if (imgRef.current) {
  //       const imgWidth = imgRef.current.offsetWidth;

  //       const calculatedRadius = (imgWidth / 364) * 54;
  //       const calculatedTimeSize = (imgWidth / 364) * 14;
  //       const calculatedChannelNameSize = (imgWidth / 364) * 8;
  //       const calculatedChannelPostsSize = (imgWidth / 364) * 12;
  //       const calculatedFooterIconSize = (imgWidth / 364) * 20;
  //       const calculatedDisplayTopSize = (imgWidth / 364) * 80;
  //       const calculatedDisplayBottomSize = (imgWidth / 364) * 60;
  //       const calculatedDownloadIconSize = (imgWidth / 364) * 20;
  //       const calculatedFeedHeightSize = (imgWidth / 364) * 300;
  //       const calculatedAvatarSize = (imgWidth / 364) * 30;

  //       // Обновляем все значения в состоянии
  //       setResizes({
  //         borderRadius: calculatedRadius,
  //         timeSize: calculatedTimeSize,
  //         channelNameSize: calculatedChannelNameSize,
  //         channelPostsSize: calculatedChannelPostsSize,
  //         footerIconSize: calculatedFooterIconSize,
  //         displayTopSize: calculatedDisplayTopSize,
  //         displayBottomSize: calculatedDisplayBottomSize,
  //         downloadIconSize: calculatedDownloadIconSize,
  //         feedHeightSize: calculatedFeedHeightSize,
  //         avatarSize: calculatedAvatarSize,
  //       });
  //     }
  //   };

  //   updateSizes();

  //   setTimeout(() => {
  //     updateSizes();
  //   }, 300);

  //   setTimeout(() => {
  //     updateSizes();
  //   }, 600);

  //   setTimeout(() => {
  //     updateSizes();
  //   }, 1000);

  //   console.log("sizes");

  //   window.addEventListener("resize", updateSizes);

  //   return () => {
  //     window.removeEventListener("resize", updateSizes);
  //   };
  // }, [imgRef.current]);

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

  const postEditor = useEditor({
    extensions: [StarterKit, Link, Underline],
    content: (postText && postText[0]?.content) || "",
    editable: false,
  });

  const editorRes = useEditor({
    extensions: [StarterKit, Link, Underline],
    content: (textRes && textRes[0]) || "",
    editable: false,
  });

  useEffect(() => {
    if (postEditor && postText) {
      postEditor.commands.setContent(postText[0]?.content || "");
    }
    if (editorRes && textRes) {
      editorRes.commands.setContent(textRes[0] || "");
    }
  }, [postText, postEditor, editorRes]);

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
                  <EditorContent
                    className={styles.post__text}
                    editor={postEditor}
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
                  <EditorContent
                    className={styles.post__text}
                    editor={editorRes}
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
      <DownloadAllBtn
        post={post}
        formState={formState}
        currentPost={currentPost}
      />
    </div>
  );
};
