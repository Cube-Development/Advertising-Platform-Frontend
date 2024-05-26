import { FC } from "react";
import styles from "./styles.module.scss";
import {
  DateListProps,
  ICreatePostForm,
  IDatetime,
  IPostChannel,
  TimeListProps,
} from "@shared/types/createPost";
import {
  InstagramIcon,
  PostIcon,
  TelegramIcon,
  YouTubeIcon,
} from "@shared/assets";
import { CreatePostFormData } from "@shared/config/createPostData";
import { platformToIcon } from "@shared/config/platformData";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@shared/ui/shadcn-ui/ui/alert-dialog";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { X } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@shared/ui/shadcn-ui/ui/tabs";
import {
  platformTypesNum,
  platformTypesStr,
} from "@shared/config/platformTypes";
import { EmptyPost } from "@entities/postDisplay/postDispayTelegram/UI/emptyPost";
import { PostDispayInstagram, PostDispayTelegram } from "@entities/postDisplay";

interface PostPlatformProps {
  card: IPostChannel;
  CustomCalendar: FC<DateListProps>;
  TimeList: FC<TimeListProps>;
  setValue: UseFormSetValue<ICreatePostForm>;
  getValues: UseFormGetValues<ICreatePostForm>;
  formState: ICreatePostForm;
}

export const PostPlatform: FC<PostPlatformProps> = ({
  card,
  CustomCalendar,
  TimeList,
  setValue,
  getValues,
  formState,
}) => {
  const handleChangeTime = (timeList: string[]) => {
    const form: ICreatePostForm = getValues();
    const datetime = form.datetime;
    const currentCard: IDatetime = (datetime.orders || []).find(
      (item) => item.order_id === card.id,
    ) || {
      order_id: card.id,
    };
    const allCards = (datetime.orders || []).filter(
      (item) => item.order_id !== card.id,
    );
    currentCard.time_from = timeList[0];
    currentCard.time_to = timeList[1];

    datetime.orders = [...allCards, currentCard];
    setValue(CreatePostFormData.datetime, datetime);
  };

  const handleChangeDate = (dateList: Date[]) => {
    const form: ICreatePostForm = getValues();
    const datetime = form.datetime;
    const currentCard: IDatetime = (datetime.orders || []).find(
      (item) => item.order_id === card.id,
    ) || {
      order_id: card.id,
    };
    const allCards = (datetime.orders || []).filter(
      (item) => item.order_id !== card.id,
    );

    if (dateList.length === 1) {
      delete currentCard.date_from;
      delete currentCard.date_to;
      currentCard.date = dateList[0].toLocaleDateString();
    } else {
      delete currentCard.date;
      currentCard.date_from = dateList[0].toLocaleDateString();
      currentCard.date_to = dateList[1].toLocaleDateString();
    }

    datetime.orders = [...allCards, currentCard];
    setValue(CreatePostFormData.datetime, datetime);
  };

  // const telegramPost = formState?.posts.find(
  //   (post) => post.platform === platformTypesNum.telegram
  // );
  // const instagramPost = formState?.posts.find(
  //   (post) => post.platform === platformTypesNum.instagram
  // );
  // const youtubePost = formState?.posts.find(
  //   (post) => post.platform === platformTypesNum.youtube
  // );

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <img src={card.avatar} alt="" />
        </div>
        <div className={styles.title}>
          <p>{card.name}</p>
          <span>{card.category}</span>
        </div>
      </div>
      <div className={styles.type}>
        {card.platform in platformToIcon
          ? platformToIcon[card.platform]()
          : null}
      </div>
      <div className={styles.type}>
        <CustomCalendar onChange={handleChangeDate} />
      </div>
      <div className={styles.type}>
        <TimeList onChange={handleChangeTime} />
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className={styles.data}>
            <PostIcon />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="gap-0">
          <AlertDialogHeader className="flex items-end justify-end">
            <AlertDialogAction>
              <X className="m-4" />
            </AlertDialogAction>
          </AlertDialogHeader>
          {formState?.posts.length ? (
            <Tabs
              defaultValue={
                formState?.posts[0]?.platform === platformTypesNum.telegram
                  ? platformTypesStr.telegram
                  : formState?.posts[0].platform === platformTypesNum.instagram
                    ? platformTypesStr.instagram
                    : platformTypesStr.youtube
              }
              className="w-[30vw] px-6 h-[40vw]"
            >
              <TabsList className="grid w-full grid-cols-2">
                {formState?.posts?.map((post) =>
                  post.platform === platformTypesNum.telegram ? (
                    <TabsTrigger
                      key={post?.platform}
                      value={platformTypesStr.telegram}
                    >
                      <TelegramIcon />
                    </TabsTrigger>
                  ) : post.platform === platformTypesNum.instagram ? (
                    <TabsTrigger
                      key={post?.platform}
                      value={platformTypesStr.instagram}
                    >
                      <InstagramIcon />
                    </TabsTrigger>
                  ) : (
                    <TabsTrigger
                      key={post?.platform}
                      value={platformTypesStr.youtube}
                    >
                      <YouTubeIcon />
                    </TabsTrigger>
                  ),
                )}
              </TabsList>
              {formState?.posts?.map((post) =>
                post.platform === platformTypesNum.telegram ? (
                  <TabsContent
                    key={post?.platform}
                    value={platformTypesStr.telegram}
                    className="w-[15vw] mx-auto mt-[30px]"
                  >
                    <PostDispayTelegram
                      formState={formState}
                      platformId={platformTypesNum.telegram}
                    />
                  </TabsContent>
                ) : post.platform === platformTypesNum.instagram ? (
                  <TabsContent
                    key={post?.platform}
                    value={platformTypesStr.instagram}
                    className="w-[15vw] mx-auto mt-[30px]"
                  >
                    <PostDispayInstagram
                      formState={formState}
                      platformId={platformTypesNum.instagram}
                    />
                  </TabsContent>
                ) : (
                  <TabsContent
                    key={post?.platform}
                    value={platformTypesStr.youtube}
                  >
                    youtube
                  </TabsContent>
                ),
              )}
            </Tabs>
          ) : (
            <EmptyPost />
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
