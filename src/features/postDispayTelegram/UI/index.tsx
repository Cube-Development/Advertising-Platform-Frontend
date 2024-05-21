import { FC } from "react";
import styles from "./styles.module.scss";
import { ICreatePostForm } from "@shared/types/createPost";
import { EmptyPost } from "./emptyPost";
import { EyeIcon } from "@shared/assets";
import { TelegramPhotos } from "./telegramPhotos";
import { TelegramFile } from "./telegramFile";
import { TelegramComment } from "./telegramComment";

interface PostDispayTelegramProps {
  formState: ICreatePostForm;
  platformId: number;
}

export const PostDispayTelegram: FC<PostDispayTelegramProps> = ({
  formState,
  platformId,
}) => {
  const currentPost = formState.posts.find(
    (item) => item.platform === platformId,
  );
  const postText = currentPost?.text;
  const postPhotos = currentPost?.media;
  // const postVideo = currentPost?.files?.filter(
  //   (file) => file.content_type === ContentType.video
  // );
  const postButtons = currentPost?.buttons;
  const postFile = currentPost?.files;
  const postComment = currentPost?.comment;

  return (
    <div className={styles.screen_wrapper}>
      <div className={styles.screen}>
        <p className={styles.time}>9:41</p>
        <img
          className={styles.statusbar}
          src="/src/shared/assets/img/statusbar.svg"
        />
        <img
          className={styles.dynamic}
          src="/src/shared/assets/img/dynamic.png"
        />
        <img className={styles.back} src="/src/shared/assets/img/back.svg" />
        <div className={styles.channel}>
          <p className={styles.channel__name}>Channel name</p>
          <p className={styles.channel__subs}>1 312 678 subscribers</p>
        </div>
        <div className={styles.avatar}></div>
        <img
          className={styles.mockup}
          src="/src/shared/assets/img/iphonescreen.png"
        />
        <div className={styles.unmute}>Unmute</div>
        <div className={styles.display}>
          {(postText && postText[0]?.content !== "<p></p>") ||
          postPhotos?.length ||
          postComment ||
          postFile?.length ||
          postButtons?.length ? (
            <div className={styles.content}>
              <div className={styles.post}>
                {postPhotos && postPhotos?.length > 0 && (
                  <TelegramPhotos photos={postPhotos} />
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
      </div>
    </div>
  );
};
