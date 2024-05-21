import { FC } from "react";
import styles from "./styles.module.scss";
import { ICreatePostForm } from "@shared/types/createPost";
import { EmptyPost } from "./emptyPost";
import { InstagramPhotos } from "./instagramPhotos";
import { InstagramFile } from "./instagramFile";
import { InstagramComment } from "./instagramComment";
import { ChevronLeft, Heart, MessageCircle, Send } from "lucide-react";
import { AvatarIcon, SaveIcon } from "./assets";
import { HomeIcon } from "./assets";
import { MarketIcon } from "./assets";
import { ReelsIcon } from "./assets";
import { SearchIcon } from "./assets";
import { EyeDisabledIcon } from "@shared/assets/icons/eyeDisabled";

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
  const postText = currentPost?.text;
  const postPhotos = currentPost?.media;
  // const postVideo = currentPost?.files?.filter(
  //   (file) => file.content_type === ContentType.video
  // );
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
        <div className={styles.header}>
          <ChevronLeft />
          <div className={styles.channel}>
            <p className={styles.channel__name}>Channel name</p>
            <p className={styles.channel__posts}>Posts</p>
          </div>
          <div className={styles.subscribe}>Subscribe</div>
        </div>
        <img
          className={styles.mockup}
          src="/src/shared/assets/img/iphonescreen.png"
        />
        <div className={styles.footer}>
          <HomeIcon />
          <SearchIcon />
          <ReelsIcon />
          <MarketIcon />
          <AvatarIcon />
        </div>
        <div className={styles.display}>
          {(postText && postText[0]?.content !== "<p></p>") ||
          postPhotos?.length ||
          postComment ||
          postFile?.length ? (
            <div className={styles.content}>
              <div className={styles.post}>
                <div className={styles.head}>
                  <div className={styles.account}>
                    <div className={styles.account__avatar}></div>
                    <div className={styles.account__name}>
                      <p className={styles.name}>Channel</p>
                      <p className={styles.category}>Category</p>
                    </div>
                  </div>
                  <div className={styles.head__more}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                {postPhotos && postPhotos?.length > 0 ? (
                  <InstagramPhotos photos={postPhotos} />
                ) : (
                  <div className={styles.empty__photo}>
                    <EyeDisabledIcon />
                    <p>No content yet...</p>
                  </div>
                )}
                <div className={styles.post__footer}>
                  <div className={styles.left}>
                    <Heart
                      strokeWidth="1.5px"
                      stroke="#fff"
                      width="22px"
                      height="22px"
                    />
                    <MessageCircle
                      strokeWidth="1.5px"
                      stroke="#fff"
                      width="22px"
                      height="22px"
                    />
                    <Send
                      strokeWidth="1.5px"
                      stroke="#fff"
                      width="20px"
                      height="20px"
                    />
                  </div>
                  <SaveIcon />
                </div>
                <p className={styles.post__likes}>893 likes</p>
                {postText && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: postText[0]?.content || "",
                    }}
                    className={styles.post__text}
                  />
                )}
                <div className={styles.post__info}>
                  <p className={styles.show__comments}>
                    Show all comments (189)
                  </p>
                  <p className={styles.date}>Now •</p>
                </div>
              </div>
              {postFile?.length && <InstagramFile file={postFile[0]} />}
              {postComment && <InstagramComment comment={postComment} />}
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
