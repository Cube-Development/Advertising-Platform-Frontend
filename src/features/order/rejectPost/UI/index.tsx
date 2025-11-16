import { IOrderFeature, useRejectOrderMutation } from "@entities/project";
import { BREAKPOINT } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";
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
  MyButton,
  useToast,
} from "@shared/ui";
import { Loader, SendHorizonal, X } from "lucide-react";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const RejectPost: FC<IOrderFeature> = ({ order_id }) => {
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const [rejectOrder, { isLoading }] = useRejectOrderMutation();
  const { t } = useTranslation();
  const handleOnClick = () => {
    order_id &&
      !isLoading &&
      comment.length > 0 &&
      rejectOrder({ order_id, comment, theme: "" })
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.orders_advertiser.reject_post.success"),
          });
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.orders_advertiser.reject_post.error"),
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
          <DialogTrigger asChild>
            <MyButton buttons_type="button__white" className={styles.button}>
              <big>{t(`order_btn.reject.btn_title`)}</big>
            </MyButton>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="sr-only"></DialogTitle>
            <DialogDescription className="sr-only"></DialogDescription>
            <div className={styles.popover}>
              <div className="absolute -right-3 -top-3">
                <DialogClose>
                  <X width={20} height={20} stroke="#2d2d2d" />
                </DialogClose>
              </div>
              <div className={styles.description}>
                <h2 className={styles.description__title}>
                  {t(`order_btn.reject.description.title`)}
                </h2>
                <p className={styles.description__subtitle}>
                  {t(`order_btn.reject.description.subtitle`)}
                </p>
              </div>
              <div className={styles.comment}>
                <textarea
                  className={styles.comment__input}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  value={comment}
                  autoFocus
                />
                <p
                  className={styles.comment__send_icon}
                  onClick={handleOnClick}
                >
                  {isLoading ? (
                    <Loader
                      className="animate-spin"
                      stroke="#0BADC2"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <SendHorizonal />
                  )}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <MyButton buttons_type="button__white" className={styles.button}>
              <big>{t(`order_btn.reject.btn_title`)}</big>
            </MyButton>
          </DrawerTrigger>
          <DrawerContent className="bottom-0 top-auto rounded-t-xl">
            <DialogTitle className="sr-only"></DialogTitle>
            <DialogDescription className="sr-only"></DialogDescription>
            <div className="mx-auto mt-4 h-1.5 w-[80px] rounded-full bg-black/20" />
            <div className={styles.drawer_popover}>
              <div className={styles.description}>
                <h2 className={styles.description__title}>
                  {t(`order_btn.reject.description.title`)}
                </h2>
                <p className={styles.description__subtitle}>
                  {t(`order_btn.reject.description.subtitle`)}
                </p>
              </div>
              <div className={styles.comment}>
                <textarea
                  className={styles.comment__input}
                  autoFocus
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  value={comment}
                />
                <p
                  className={styles.comment__send_icon}
                  onClick={handleOnClick}
                >
                  {isLoading ? (
                    <Loader
                      className="animate-spin"
                      stroke="#0BADC2"
                      width={20}
                      height={20}
                    />
                  ) : (
                    <SendHorizonal />
                  )}
                </p>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
