import { FC, useState } from "react";
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
import { IOrderFeature } from "@entities/project";
import {
  bloggerOffersAPI,
  usePublishPostBloggerMutation,
} from "@entities/offer";
import { ArrowLongHorizontalIcon } from "@shared/assets";
import { BREAKPOINT } from "@shared/config";
import { useAppDispatch, useWindowWidth } from "@shared/hooks";

export const SendLink: FC<IOrderFeature> = ({ order_id }) => {
  const [url, setUrl] = useState("");
  const [isUrlValid, setIsUrlValid] = useState(true);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const handleInvalidateCache = () => {
    dispatch(bloggerOffersAPI.util.resetApiState());
  };
  const [publishPostBlogger, { isLoading }] = usePublishPostBloggerMutation();
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

  const handleOnClick = () => {
    if (!url || !isValidUrl(url)) {
      setIsUrlValid(false);
      return;
    }
    if (isLoading) return;
    setIsUrlValid(true);
    publishPostBlogger({ order_id, url })
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
                  {isLoading ? (
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
                  {isLoading ? (
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
