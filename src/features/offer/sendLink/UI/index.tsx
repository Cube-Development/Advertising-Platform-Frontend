import { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Loader, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  ToastAction,
  useToast,
} from "@shared/ui";
import { IOrderFeature, usePublishPostMutation } from "@entities/project";
import {
  bloggerOffersAPI,
  usePublishPostBloggerMutation,
} from "@entities/offer";
import { ArrowLongHorizontalIcon } from "@shared/assets";
import { BREAKPOINT } from "@shared/config";
import { useAppDispatch, useWindowWidth } from "@shared/hooks";
import { SetDateTime } from "../components";

export const SendLink: FC<IOrderFeature> = ({
  order_id,
  code,
  project_id,
  date,
  time,
}) => {
  const [url, setUrl] = useState("");
  const [isUrlValid, setIsUrlValid] = useState(true);
  const [dateValue, setDateValue] = useState(date || "");
  const [timeValue, setTimeValue] = useState(time || "");
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const handleInvalidateCache = () => {
    dispatch(bloggerOffersAPI.util.resetApiState());
  };
  const [publishPostBlogger, { isLoading }] = usePublishPostBloggerMutation();
  // agency publisher flow
  const [publishPost, { isLoading: isPublishPostLoading }] =
    usePublishPostMutation();
  const { t } = useTranslation();

  // Функция для проверки валидности URL
  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Функция для проверки валидности даты/времени
  const isValidDate = (dateStr: string, timeStr: string): boolean => {
    if (!dateStr || !timeStr) return false;
    try {
      // Проверка формата времени: должно быть HH:mm (две цифры, двоеточие, две цифры)
      const timePattern = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
      if (!timePattern.test(timeStr)) return false;

      const [day, month, year] = dateStr.split(".");
      const [hour, minute] = timeStr.split(":");

      if (!day || !month || !year || !hour || !minute) return false;

      const dayNum = parseInt(day);
      const monthNum = parseInt(month);
      const yearNum = parseInt(year);
      const hourNum = parseInt(hour);
      const minuteNum = parseInt(minute);

      if (
        isNaN(dayNum) ||
        isNaN(monthNum) ||
        isNaN(yearNum) ||
        isNaN(hourNum) ||
        isNaN(minuteNum)
      )
        return false;

      if (
        dayNum < 1 ||
        dayNum > 31 ||
        monthNum < 1 ||
        monthNum > 12 ||
        hourNum < 0 ||
        hourNum > 23 ||
        minuteNum < 0 ||
        minuteNum > 59
      )
        return false;

      const date = new Date(yearNum, monthNum - 1, dayNum, hourNum, minuteNum);

      // Проверяем, что дата валидна и соответствует введенным значениям
      return (
        date.getFullYear() === yearNum &&
        date.getMonth() === monthNum - 1 &&
        date.getDate() === dayNum &&
        date.getHours() === hourNum &&
        date.getMinutes() === minuteNum &&
        !isNaN(date.getTime())
      );
    } catch {
      return false;
    }
  };

  // Функция для форматирования даты в формат DD.MM.YYYY HH:mm
  const formatDateTime = (dateStr: string, timeStr: string): string | null => {
    if (!isValidDate(dateStr, timeStr)) {
      return null;
    }
    try {
      const [day, month, year] = dateStr.split(".");
      const [hour, minute] = timeStr.split(":");
      // Обеспечиваем двузначный формат для дня, месяца, часа и минуты
      const formattedDay = day.padStart(2, "0");
      const formattedMonth = month.padStart(2, "0");
      const formattedHour = hour.padStart(2, "0");
      const formattedMinute = minute.padStart(2, "0");
      return `${formattedDay}.${formattedMonth}.${year} ${formattedHour}:${formattedMinute}`;
    } catch {
      return null;
    }
  };

  // Обработчик изменения даты/времени
  const handleDateTimeChange = (newDate: string, newTime: string) => {
    setDateValue(newDate);
    setTimeValue(newTime);
  };

  // Синхронизируем стейт с пропсами при их изменении
  useEffect(() => {
    if (date) setDateValue(date);
    if (time) setTimeValue(time);
  }, [date, time]);

  const handleOnClick = () => {
    if (!url || !isValidUrl(url)) {
      setIsUrlValid(false);
      return;
    }
    if (isLoading || isPublishPostLoading) return;
    setIsUrlValid(true);

    let publishedDate: string;
    if (code && dateValue && timeValue) {
      const formattedDate = formatDateTime(dateValue, timeValue);
      if (!formattedDate) {
        toast({
          variant: "error",
          title: "Invalid date or time",
        });
        return;
      }
      publishedDate = formattedDate;
    } else {
      // Форматируем текущую дату в формат DD.MM.YYYY HH:mm
      const now = new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();
      const hour = String(now.getHours()).padStart(2, "0");
      const minute = String(now.getMinutes()).padStart(2, "0");
      publishedDate = `${day}.${month}.${year} ${hour}:${minute}`;
    }

    (code && project_id && order_id && url
      ? publishPost({
          order_id,
          post_url: url,
          code,
          project_id,
          published: publishedDate,
        })
      : publishPostBlogger({ order_id, url })
    )
      .unwrap()
      .then(() => {
        toast({
          variant: "success",
          title: t("toasts.offers_blogger.send_link.success"),
        });
        handleInvalidateCache();
      })
      .catch((error) => {
        toast({
          variant: "error",
          title: t("toasts.offers_blogger.send_link.error"),
          action: <ToastAction altText="Ok">Ok</ToastAction>,
        });
        console.error("error: ", error);
      });
  };

  const screen = useWindowWidth();

  const [open, setOpen] = useState(false);

  return (
    <>
      {screen >= BREAKPOINT.MD ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <p className={styles.button}>
              {t(`offer_btn.send_link`)}
              <ArrowLongHorizontalIcon className="icon__white" />
            </p>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="sr-only"></DialogTitle>
            <div className={styles.popover}>
              <div className="absolute -right-3 -top-3">
                <DialogClose>
                  <X width={20} height={20} stroke="#2d2d2d" />
                </DialogClose>
              </div>
              <div className={styles.description}>
                <h2 className={styles.description__title}>
                  {t("offers_blogger.offer_status.active.send_link_title")}
                </h2>
                <p className={styles.description__subtitle}>
                  {t("offers_blogger.offer_status.active.send_link_subtitle")}
                </p>
              </div>
              {code && date && time && (
                <SetDateTime
                  date={dateValue || date}
                  time={timeValue || time}
                  onChange={handleDateTimeChange}
                />
              )}
              <div className={styles.link}>
                <input
                  autoFocus
                  className={`${styles.link__input} ${!isUrlValid ? styles.link__input_invalid : ""}`}
                  placeholder={t(
                    "offers_blogger.offer_status.active.placeholder",
                  )}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setIsUrlValid(true);
                  }}
                  value={url}
                />
                <p className={styles.link__send_icon} onClick={handleOnClick}>
                  {isLoading || isPublishPostLoading ? (
                    <Loader
                      className="animate-spin"
                      stroke="#0BADC2"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <ArrowLongHorizontalIcon />
                  )}
                </p>
              </div>
              {!isUrlValid && (
                <p className={styles.error_input}>
                  {t("offers_blogger.offer_status.active.invalid_url")}
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <p className={styles.button}>
              {t(`offer_btn.send_link`)}
              <ArrowLongHorizontalIcon className="icon__white" />
            </p>
          </DrawerTrigger>
          <DrawerContent className="bottom-0 top-auto rounded-t-xl">
            <DialogTitle className="sr-only"></DialogTitle>
            <DialogDescription className="sr-only"></DialogDescription>
            <div className="mx-auto mt-4 h-1.5 w-[80px] rounded-full bg-black/20" />
            <div className={styles.drawer_popover}>
              <div className={styles.description}>
                <h2 className={styles.description__title}>
                  {t("offers_blogger.offer_status.active.send_link_title")}
                </h2>
                <p className={styles.description__subtitle}>
                  {t("offers_blogger.offer_status.active.send_link_subtitle")}
                </p>
              </div>
              {code && date && time && (
                <SetDateTime
                  date={dateValue || date}
                  time={timeValue || time}
                  onChange={handleDateTimeChange}
                />
              )}
              <div className={styles.link}>
                <input
                  autoFocus
                  className={`${styles.link__input} ${!isUrlValid ? styles.link__input_invalid : ""}`}
                  placeholder={t(
                    "offers_blogger.offer_status.active.placeholder",
                  )}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setIsUrlValid(true);
                  }}
                  value={url}
                />
                <p className={styles.link__send_icon} onClick={handleOnClick}>
                  {isLoading || isPublishPostLoading ? (
                    <Loader
                      className="animate-spin"
                      stroke="#0BADC2"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <ArrowLongHorizontalIcon />
                  )}
                </p>
              </div>
              {!isUrlValid && (
                <p className={styles.error_input}>
                  {t("offers_blogger.offer_status.active.invalid_url")}
                </p>
              )}
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
