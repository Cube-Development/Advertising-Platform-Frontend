import {
  DisplayFeed,
  DisplayShorts,
  DisplayStories,
  DisplayTelegram,
  DisplayVideos,
  PostTypesNum,
  platformTypesNum,
} from "@entities/platform";
import { GetPostRes } from "@entities/project";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  MyButton,
} from "@shared/ui";
import { X } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface SeePostProps {
  post: GetPostRes;
}

export const SeePost: FC<SeePostProps> = ({ post }) => {
  const { t } = useTranslation();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <MyButton buttons_type="button__white" className={styles.button}>
          {t(`order_btn.seePost`)}
        </MyButton>
      </AlertDialogTrigger>
      <AlertDialogContent
        className={`${styles.content} bg-transparent border-0`}
      >
        <AlertDialogDescription className="sr-only"></AlertDialogDescription>
        <AlertDialogTitle className="sr-only"></AlertDialogTitle>
        <div className="relative">
          <AlertDialogAction>
            <X className={styles.x_button} />
          </AlertDialogAction>
          {post?.platform === platformTypesNum.telegram && (
            <DisplayTelegram
              post={post}
              platformId={platformTypesNum.telegram}
            />
          )}
          {post?.platform === platformTypesNum.instagram &&
            post?.post_type === PostTypesNum.feed && (
              <DisplayFeed
                post={post}
                platformId={platformTypesNum.instagram}
              />
            )}
          {post?.platform === platformTypesNum.instagram &&
            post?.post_type === PostTypesNum.FullHd_vertical && (
              <DisplayStories
                post={post}
                platformId={platformTypesNum.instagram}
              />
            )}
          {post?.platform === platformTypesNum.youtube &&
            post?.post_type === PostTypesNum.FullHd_vertical && (
              <DisplayShorts
                post={post}
                platformId={platformTypesNum.youtube}
              />
            )}
          {post?.platform === platformTypesNum.youtube &&
            post?.post_type === PostTypesNum.FullHd_horizontal && (
              <DisplayVideos
                post={post}
                platformId={platformTypesNum.youtube}
              />
            )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
