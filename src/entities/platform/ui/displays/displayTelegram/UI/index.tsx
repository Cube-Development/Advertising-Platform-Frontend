import { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { EmptyPost } from "./emptyPost";
import { EyeIcon } from "@shared/assets";
import { TelegramMedia } from "./media";
import { TelegramFile } from "./file";
import { TelegramComment } from "./comment";
import { ContentType, GetPostRes, ICreatePostForm } from "@entities/project";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { DownloadAllBtn } from "../../downloadAllBtn";

interface DisplayTelegramProps {
  formState?: ICreatePostForm;
  platformId: number;
  post?: GetPostRes;
  orderId?: string;
}

export const DisplayTelegram: FC<DisplayTelegramProps> = ({
  formState,
  platformId,
  post,
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
  const textRes = post && post?.text;
  const fileRes = post &&
    post?.files.length > 0 && {
      content_type: ContentType.file,
      content: post.files[0],
    };
  const buttonsRes = post && [
    ...post.buttons.map((btn) => ({
      content_type: ContentType.button,
      content: btn?.content,
      url: btn?.url,
    })),
  ];
  const commentRes = post && post?.comment;

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
    : (formState?.posts || []).find((item) => item.platform === platformId) || {
        platform: platformId,
        files: [],
        media: [],
        buttons: [],
      };
  const postText = currentPost?.text;
  const postMedia = currentPost?.media;
  const postFile = currentPost?.files;
  const postButtons = currentPost?.buttons;
  const postComment = currentPost?.comment;

  const imgRef = useRef<HTMLImageElement>(null);
  const [resizes, setResizes] = useState<{
    borderRadius: number;
    timeSize: number;
    channelNameSize: number;
    channelSubsSize: number;
    avatarWidthSize: number;
    unmuteSize: number;
    displayTopSize: number;
    displayBottomSize: number;
    downloadIconSize: number;
  } | null>(null);

  useEffect(() => {
    const imgElement = imgRef.current;
    if (!imgElement) return;

    const updateSizes = () => {
      const imgWidth = imgElement.offsetWidth;
      setResizes({
        borderRadius: (imgWidth / 364) * 54,
        timeSize: (imgWidth / 364) * 14,
        channelNameSize: (imgWidth / 364) * 12,
        channelSubsSize: (imgWidth / 364) * 10,
        avatarWidthSize: (imgWidth / 364) * 30,
        unmuteSize: (imgWidth / 364) * 14,
        displayTopSize: (imgWidth / 364) * 80,
        displayBottomSize: (imgWidth / 364) * 60,
        downloadIconSize: (imgWidth / 364) * 20,
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

  // Обновляем контент редактора, когда изменяется postText
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
        <img className={styles.back} src="/images/phoneDisplay/back.svg" />
        <div className={styles.channel}>
          <p
            className={styles.channel__name}
            style={{ fontSize: `${resizes?.channelNameSize}px` }}
          >
            Channel name
          </p>
          <p
            className={styles.channel__subs}
            style={{ fontSize: `${resizes?.channelSubsSize}px` }}
          >
            1 312 678 subscribers
          </p>
        </div>
        <div
          className={styles.avatar}
          style={{
            width: `${resizes?.avatarWidthSize}px`,
            height: `${resizes?.avatarWidthSize}px`,
          }}
        ></div>
        <img
          ref={imgRef}
          className={styles.mockup}
          src="/images/phoneDisplay/iphonescreen.png"
        />
        <div
          className={styles.unmute}
          style={{ fontSize: `${resizes?.unmuteSize}px` }}
        >
          Unmute
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
            postFile?.length ||
            postButtons?.length ? (
              <div className={styles.content}>
                <div className={styles.post}>
                  {postMedia && postMedia?.length > 0 && (
                    <TelegramMedia
                      medias={postMedia}
                      iconSize={resizes?.downloadIconSize || 20}
                    />
                  )}
                  <EditorContent
                    className={styles.post__text}
                    editor={postEditor}
                    style={{ fontSize: `${resizes?.timeSize}px` }}
                  />
                  <div className={styles.info}>
                    <EyeIcon />
                    <span>213,7K</span>
                    <span>19:00</span>
                  </div>
                </div>
                {postButtons && postButtons?.length > 0 && (
                  <div className={styles.buttons}>
                    {postButtons?.map((button, index) => (
                      <a
                        key={index}
                        href={button?.url}
                        target="_blank"
                        className="truncate"
                        style={{ fontSize: `${resizes?.timeSize}px` }}
                      >
                        {button?.content}
                      </a>
                    ))}
                  </div>
                )}
                {postFile?.length && (
                  <TelegramFile
                    file={postFile[0]}
                    fontSize={resizes?.timeSize || 14}
                  />
                )}
                {postComment && (
                  <TelegramComment
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
            fileRes ||
            buttonsRes?.length ? (
              <div className={styles.content}>
                <div className={styles.post}>
                  {mediaRes && mediaRes?.length > 0 && (
                    <TelegramMedia
                      mediasRes={mediaRes}
                      iconSize={resizes?.downloadIconSize || 20}
                    />
                  )}
                  <EditorContent
                    className={styles.post__text}
                    editor={editorRes}
                    style={{ fontSize: `${resizes?.timeSize}px` }}
                  />

                  <div className={styles.info}>
                    <EyeIcon />
                    <span>213,7K</span>
                    <span>19:00</span>
                  </div>
                </div>
                {buttonsRes && buttonsRes?.length > 0 && (
                  <div className={styles.buttons}>
                    {buttonsRes?.map((button, index) => (
                      <a
                        key={index}
                        href={button?.url}
                        target="_blank"
                        className="truncate"
                        style={{ fontSize: `${resizes?.timeSize}px` }}
                      >
                        {button?.content}
                      </a>
                    ))}
                  </div>
                )}
                {fileRes && (
                  <TelegramFile
                    file={fileRes}
                    fontSize={resizes?.timeSize || 14}
                  />
                )}
                {commentRes && (
                  <TelegramComment
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
      {((post?.files && post?.files?.length > 0) ||
        (post?.photo && post?.photo?.length > 0) ||
        (post?.video && post?.video?.length > 0)) && (
        <DownloadAllBtn
          post={post}
          formState={formState}
          currentPost={currentPost}
        />
      )}
      {/* {post?.text && post?.text.length > 0 && (
        <CopyTextBtn
          text={formState ? postEditor?.getText() : editorRes?.getText()}
        />
      )} */}
    </div>
  );
};
