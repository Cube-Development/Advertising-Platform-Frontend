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
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { PostIcon2 } from "@shared/assets";

interface SeePostProps {
  post: GetPostRes;
  className?: string;
}

export const SeePost: FC<SeePostProps> = ({ post, className }) => {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <MyButton
          buttons_type="button__white"
          className={`${className ? className : styles.button} [&>svg]:size-3 [&>svg]:scale-[1.75]`}
        >
          <PostIcon2 /> {t(`order_btn.seePost`)}
        </MyButton>
      </AlertDialogTrigger>
      <AlertDialogContent
        showOverlay={false}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 !left-0 !top-0 !translate-x-0 !translate-y-0 !w-full !h-full !max-w-none !max-h-none !rounded-none !border-0 !shadow-none"
      >
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDialogOpen(false)}
        />
        <div
          className={`relative z-50 ${styles.content} bg-transparent border-0`}
        >
          <AlertDialogDescription className="sr-only"></AlertDialogDescription>
          <AlertDialogTitle className="sr-only"></AlertDialogTitle>
          <div className="relative">
            <AlertDialogAction
              className="!bg-transparent absolute -right-[60px] -top-8"
              onClick={() => setIsDialogOpen(false)}
            >
              <X className={`${styles.x_button} text-black`} />
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
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
