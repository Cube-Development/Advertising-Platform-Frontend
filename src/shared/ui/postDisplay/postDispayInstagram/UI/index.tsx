import { FC } from "react";
import styles from "./styles.module.scss";
import { ICreatePostForm } from "@shared/types/createPost";
import { EmptyPost } from "./emptyPost";
import { InstagramMedia } from "./instagramMedia";
import { InstagramFile } from "./instagramFile";
import { InstagramComment } from "./instagramComment";
import { ChevronLeft, Heart, MessageCircle, Send } from "lucide-react";
import { AvatarIcon, SaveIcon } from "./assets";
import { HomeIcon } from "./assets";
import { MarketIcon } from "./assets";
import { ReelsIcon } from "./assets";
import { SearchIcon } from "./assets";
import { EyeDisabledIcon } from "@shared/assets/icons/eyeDisabled";
import { GetPostRes } from "@shared/store/services/getPostService";
import { ContentType } from "@shared/config/createPostData";

interface PostDispayInstagramProps {
  formState?: ICreatePostForm;
  platformId: number;
  post?: GetPostRes;
}

export const PostDispayInstagram: FC<PostDispayInstagramProps> = ({
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
  const textRes = post && post.text;
  const fileRes = post && {
    content_type: ContentType.file,
    content: post.files[0],
  };
  const commentRes = post && post.comment;

  // postFromData
  const currentPost =
    formState && formState.posts.find((item) => item.platform === platformId);
  const postText = currentPost?.text;
  const postMedia = currentPost?.media;
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
        {formState ? (
          <div className={styles.display}>
            {(postText && postText[0]?.content !== "<p></p>") ||
            postMedia?.length ||
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
                  {postMedia && postMedia?.length > 0 ? (
                    <InstagramMedia medias={postMedia} />
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
        ) : (
          <div className={styles.display}>
            {(textRes && textRes[0] !== "<p></p>") ||
            mediaRes?.length ||
            commentRes ||
            fileRes ? (
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
                  {mediaRes && mediaRes?.length > 0 ? (
                    <InstagramMedia mediasRes={mediaRes} />
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
                  {textRes && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: textRes[0] || "",
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
                {fileRes && <InstagramFile file={fileRes} />}
                {commentRes && <InstagramComment comment={commentRes} />}
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
