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
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface SeePostProps {
  post: GetPostRes;
}

export const SeePost: FC<SeePostProps> = ({ post }) => {
  const { t } = useTranslation();

  const [screen, setScreen] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreen(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <MyButton buttons_type="button__white" className={styles.button}>
          <p>{t(`order_btn.seePost`)}</p>
        </MyButton>
      </AlertDialogTrigger>
      <AlertDialogContent
        className={`max-w-[300px] gap-0 bg-transparent grid items-center justify-center shadow-none ${
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
