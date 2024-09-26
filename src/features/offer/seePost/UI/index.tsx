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
          <p>{t(`offer_btn.see_post`)}</p>
        </MyButton>
      </AlertDialogTrigger>
      <AlertDialogContent className="gap-0 w-[30vw] h-[40vw] bg-transparent grid items-center justify-center shadow-none">
        <div className="w-[18vw] h-full relative">
          <AlertDialogAction>
            <X className="absolute -right-16 -top-10 w-[50px] rounded-full p-2 bg-white cursor-pointer" />
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
