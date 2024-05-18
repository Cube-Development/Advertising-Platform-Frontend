import { FC } from "react";
import styles from "./styles.module.scss";
import { ICreatePostForm } from "@shared/types/createPost";
import { ContentType } from "@shared/config/createPostData";
import { EmptyPost } from "./emptyPost";
import { EyeIcon } from "@shared/assets";
import { InstagramPhotos } from "./instagramPhotos";

interface PostDispayInstagramProps {
  formState: ICreatePostForm;
  platformId: number;
}

export const PostDispayInstagram: FC<PostDispayInstagramProps> = ({
  formState,
  platformId,
}) => {
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
          {(postText && postText?.content !== "<p></p>") ||
          postPhotos?.length ||
          postVideo ? (
            <div className={styles.content}>
              <div className={styles.post}>
                {postPhotos && postPhotos?.length > 0 && (
                  <InstagramPhotos photos={postPhotos} />
                )}
                {postVideo && <video src={postVideo.content} />}
                {postText && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: postText?.content || "",
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
