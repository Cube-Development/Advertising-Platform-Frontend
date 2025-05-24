import { FC, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { EmptyPost } from "./emptyPost";
import { YoutubeMedia } from "./media";
import { YoutubeFile } from "./file/ui";
import { YoutubeComment } from "./comment/ui";
import {
  CalendarCheck2,
  CircleFadingPlus,
  CircleUserRound,
  Home,
  SquareSlash,
} from "lucide-react";
import { ContentType, GetPostRes, ICreatePostForm } from "@entities/project";
import { PostTypesNum } from "@entities/platform";
import { EyeDisabledIcon } from "@shared/assets";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { DownloadAllBtn } from "../../../utils/downloadAllBtn";
import { CopyTextBtn } from "../../../utils/copyTextBtn";
import { preparePostsData } from "@entities/platform/ui/utils";

interface DisplayShortsProps {
  formState?: ICreatePostForm;
  platformId: number;
  post?: GetPostRes;
  postType?: PostTypesNum;
  orderId?: string;
}

export const DisplayShorts: FC<DisplayShortsProps> = ({
  formState,
  platformId,
  post,
  postType,
  orderId,
}) => {
  // post response
  // const photosRes = post
  //   ? [
  //       ...post.photo.map((photo) => ({
  //         content_type: ContentType.photo,
  //         content: photo,
  //       })),
  //     ]
  //   : [];
  // const videosRes = post
  //   ? [
  //       ...post.video.map((video) => ({
  //         content_type: ContentType.video,
  //         content: video,
  //       })),
  //     ]
  //   : [];
  // const mediaRes = [...photosRes, ...videosRes];
  // const textRes = post && post.text;
  // const fileRes = post &&
  //   post?.files.length > 0 && {
  //     content_type: ContentType.file,
  //     content: post.files[0],
  //   };
  // const commentRes = post && post.comment;
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
    displayTopSize: number;
    displayBottomSize: number;
    downloadIconSize: number;
    shortsHeightSize: number;
    smallIconSize: number;
    bigIconSize: number;
  } | null>(null);

  useEffect(() => {
    const imgElement = imgRef.current;
    if (!imgElement) return;

    const updateSizes = () => {
      const imgWidth = imgElement.offsetWidth;
      setResizes({
        borderRadius: (imgWidth / 364) * 54,
        timeSize: (imgWidth / 364) * 14,
        displayTopSize: (imgWidth / 364) * 50,
        displayBottomSize: (imgWidth / 364) * 60,
        downloadIconSize: (imgWidth / 364) * 20,
        shortsHeightSize: (imgWidth / 364) * 16,
        smallIconSize: (imgWidth / 364) * 24,
        bigIconSize: (imgWidth / 364) * 620,
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
    content: textRes || "",
    editable: false,
  });

  // Обновляем контент редактора, когда изменяется postText
  useEffect(() => {
    if (postEditor && postText) {
      postEditor.commands.setContent(postText[0]?.content || "");
    }
    if (editorRes && textRes) {
      editorRes.commands.setContent(textRes || "");
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
        <img
          ref={imgRef}
          className={styles.mockup}
          src="/images/phoneDisplay/iphonescreen.png"
        />
        <div className={styles.footer}>
          <div>
            <Home
              strokeWidth={1}
              width={resizes?.smallIconSize || 16}
              height={resizes?.smallIconSize || 16}
            />
            <p>Home</p>
          </div>
          <div>
            <SquareSlash
              strokeWidth={1}
              width={resizes?.smallIconSize || 16}
              height={resizes?.smallIconSize || 16}
            />
            <p>Shorts</p>
          </div>
          <CircleFadingPlus
            strokeWidth={1}
            width={resizes?.bigIconSize || 24}
            height={resizes?.bigIconSize || 24}
          />
          <div>
            <CalendarCheck2
              strokeWidth={1}
              width={resizes?.smallIconSize || 16}
              height={resizes?.smallIconSize || 16}
            />
            <p>Subscribes</p>
          </div>
          <div>
            <CircleUserRound
              strokeWidth={1}
              width={resizes?.smallIconSize || 16}
              height={resizes?.smallIconSize || 16}
            />
            <p>You</p>
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
                  {postMedia && postMedia?.length > 0 ? (
                    <YoutubeMedia
                      medias={postMedia}
                      shortsHeight={resizes?.shortsHeightSize || 620}
                      iconSize={resizes?.downloadIconSize || 14}
                    />
                  ) : (
                    <div
                      className={styles.empty__photo}
                      style={{ height: `${resizes?.shortsHeightSize}px` }}
                    >
                      <EyeDisabledIcon />
                      <p>No content yet...</p>
                    </div>
                  )}
                  <EditorContent
                    className={styles.post__text}
                    editor={postEditor}
                    style={{ fontSize: `${resizes?.timeSize}px` }}
                  />
                </div>
                {postFile && postFile?.length > 0 && (
                  <YoutubeFile
                    file={postFile[0]}
                    fontSize={resizes?.timeSize || 14}
                  />
                )}
                {postComment && (
                  <YoutubeComment
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
                  {mediaRes && mediaRes?.length > 0 ? (
                    <YoutubeMedia
                      mediasRes={mediaRes}
                      shortsHeight={resizes?.shortsHeightSize || 620}
                      iconSize={resizes?.downloadIconSize || 14}
                    />
                  ) : (
                    <div
                      className={styles.empty__photo}
                      style={{ height: `${resizes?.shortsHeightSize}px` }}
                    >
                      <EyeDisabledIcon />
                      <p>No content yet...</p>
                    </div>
                  )}
                  <EditorContent
                    className={styles.post__text}
                    editor={editorRes}
                    style={{ fontSize: `${resizes?.timeSize}px` }}
                  />
                </div>
                {fileRes && (
                  <YoutubeFile
                    file={fileRes}
                    fontSize={resizes?.timeSize || 14}
                  />
                )}
                {commentRes && (
                  <YoutubeComment
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
