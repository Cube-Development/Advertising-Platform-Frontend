import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Loader, SendHorizonal, X } from "lucide-react";
import { Rating } from "../rating";
import { IOrderFeature } from "@entities/project";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  useToast,
} from "@shared/ui";
import { useAddReviewMutation } from "@entities/channel";
import { BREAKPOINT } from "@shared/config";

export const Feedback: FC<IOrderFeature> = ({ order_id }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [review, setReview] = useState("");
  const [grade, setGrade] = useState<number>(5);
  const [addReview, { isLoading }] = useAddReviewMutation();
  const handleOnClick = () => {
    order_id &&
      addReview({
        order_id,
        review: review.length > 0 ? review : undefined,
        grade,
      })
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.orders_advertiser.add_review.success"),
          });
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.orders_advertiser.add_review.error"),
          });
          console.error("error: ", error);
        });
  };

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

  const [open, setOpen] = useState(false);

  return (
    <>
      {screen >= BREAKPOINT.MD ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <big className={styles.button}>
              {t(`order_btn.feedback.btn_title`)}
            </big>
          </DialogTrigger>
          <DialogContent>
            <div className={styles.popover}>
              <div className="absolute -right-3 -top-3">
                <DialogClose>
                  <X width={20} height={20} stroke="#2d2d2d" />
                </DialogClose>
              </div>
              <div className={styles.description}>
                <h2 className={styles.description__title}>
                  {t(`order_btn.feedback.description.title`)}
                </h2>
                <p className={styles.description__subtitle}>
                  {t(`order_btn.feedback.description.subtitle`)}
                </p>
              </div>
              <Rating
                count={5}
                value={grade}
                edit={true}
                onChange={(value) => setGrade(value)}
              />
              <div className={styles.comment}>
                <textarea
                  className={styles.comment__input}
                  onChange={(e) => {
                    setReview(e.target.value);
                  }}
                  value={review}
                  maxLength={200}
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
            <big className={styles.button}>
              {t(`order_btn.feedback.btn_title`)}
            </big>
          </DrawerTrigger>
          <DrawerContent className="top-[40dvh] rounded-t-xl">
            <div className={styles.drawer_popover}>
              <div className={styles.description}>
                <h2 className={styles.description__title}>
                  {t(`order_btn.feedback.description.title`)}
                </h2>
                <p className={styles.description__subtitle}>
                  {t(`order_btn.feedback.description.subtitle`)}
                </p>
              </div>
              <Rating
                count={5}
                value={grade}
                edit={true}
                onChange={(value) => setGrade(value)}
              />
              <div className={styles.comment}>
                <textarea
                  className={styles.comment__input}
                  onChange={(e) => {
                    setReview(e.target.value);
                  }}
                  value={review}
                  maxLength={200}
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
