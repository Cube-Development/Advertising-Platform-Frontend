import { IOrderFeature, useRejectOrderMutation } from "@entities/project";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  ToastAction,
  useToast,
} from "@shared/ui";
import { Loader, SendHorizonal, X } from "lucide-react";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { BREAKPOINT } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";

export const RejectPost: FC<IOrderFeature> = ({ order_id }) => {
  const [comment, setComment] = useState("");
  const { toast } = useToast();
  const [rejectOrder, { isLoading }] = useRejectOrderMutation();
  const { t } = useTranslation();
  const handleOnClick = () => {
    order_id &&
      comment.length > 0 &&
      rejectOrder({ order_id, comment })
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
            <small className={styles.button}>
              {t(`order_btn.reject.btn_title`)}
            </small>
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
                />
                <p
                  className={styles.comment__send_icon}
                  onClick={handleOnClick}
                >
                  {isLoading ? (
                    <Loader
                      className="animate-spin"
                      stroke="#4772e6"
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
            <small className={styles.button}>
              {t(`order_btn.reject.btn_title`)}
            </small>
          </DrawerTrigger>
          <DrawerContent className="mt-[20dvh] rounded-t-xl">
            <DialogTitle className="sr-only"></DialogTitle>
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
                      stroke="#4772e6"
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
