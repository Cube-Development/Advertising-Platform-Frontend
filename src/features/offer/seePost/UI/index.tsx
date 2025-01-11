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
import { useWindowWidth } from "@shared/hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
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
  const screen = useWindowWidth();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <MyButton buttons_type="button__white" className={styles.button}>
          <p>{t(`offer_btn.see_post`)}</p>
        </MyButton>
      </AlertDialogTrigger>
      <AlertDialogContent
        className={`max-w-[300px] gap-0 bg-transparent grid items-center justify-center shadow-none border-0 ${
          screen > 992
            ? "w-[25vw]"
            : screen > 768
              ? "w-[30vw]"
              : screen > 576
                ? "w-[35vw]"
                : screen > 475
                  ? "w-[50vw]"
                  : "w-[60vw]"
        }`}
      >
        <AlertDialogTitle className="sr-only"></AlertDialogTitle>
        <div className="relative">
          <AlertDialogAction>
            <X
              className={`absolute ${screen > 475 ? "-right-10 -top-5" : "-right-8 -top-4"} w-[30px] rounded-full p-2 bg-white cursor-pointer`}
            />
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
