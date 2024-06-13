import { FC } from "react";
import styles from "./styles.module.scss";
import { ICreatePostForm } from "@shared/types/createPost";
import { EmptyPost } from "./emptyPost";
import { EyeIcon } from "@shared/assets";
import { TelegramMedia } from "./telegramMedia";
import { TelegramFile } from "./telegramFile";
import { TelegramComment } from "./telegramComment";
import { ContentType } from "@shared/config/createPostData";
import { GetPostRes } from "@shared/store/services/getPostService";

interface PostDispayTelegramProps {
  formState?: ICreatePostForm;
  platformId: number;
  post?: GetPostRes;
}

export const PostDispayTelegram: FC<PostDispayTelegramProps> = ({
  formState,
  platformId,
  post,
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
  const fileRes = post && {
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
    ? formState?.multiposts?.find(
        (item) => item?.order_id === formState?.selectedMultiPostId,
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
        <img className={styles.back} src="/images/phoneDisplay/back.svg" />
        <div className={styles.channel}>
          <p className={styles.channel__name}>Channel name</p>
          <p className={styles.channel__subs}>1 312 678 subscribers</p>
        </div>
        <div className={styles.avatar}></div>
        <img
          className={styles.mockup}
          src="/images/phoneDisplay/iphonescreen.png"
        />
        <div className={styles.unmute}>Unmute</div>
        {formState ? (
          <div className={styles.display}>
            {(postText && postText[0]?.content !== "<p></p>") ||
            postMedia?.length ||
            postComment ||
            postFile?.length ||
            postButtons?.length ? (
              <div className={styles.content}>
                <div className={styles.post}>
                  {postMedia && postMedia?.length > 0 && (
                    <TelegramMedia medias={postMedia} />
                  )}
                  {postText && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: postText[0]?.content || "",
                      }}
                      className={styles.post__text}
                    />
                  )}
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
                      >
                        {button?.content}
                      </a>
                    ))}
                  </div>
                )}
                {postFile?.length && <TelegramFile file={postFile[0]} />}
                {postComment && <TelegramComment comment={postComment} />}
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
            fileRes ||
            buttonsRes?.length ? (
              <div className={styles.content}>
                <div className={styles.post}>
                  {mediaRes && mediaRes?.length > 0 && (
                    <TelegramMedia mediasRes={mediaRes} />
                  )}
                  {textRes && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: textRes[0] || "",
                      }}
                      className={styles.post__text}
                    />
                  )}
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
                      >
                        {button?.content}
                      </a>
                    ))}
                  </div>
                )}
                {fileRes && <TelegramFile file={fileRes} />}
                {commentRes && <TelegramComment comment={commentRes} />}
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
