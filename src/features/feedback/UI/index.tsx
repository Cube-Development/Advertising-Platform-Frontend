import { StarIcon2 } from "@shared/assets";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shared/ui/shadcn-ui/ui/popover";
import { SendHorizonal } from "lucide-react";
import { IOrderFeature } from "@shared/types/order";
import { Rating } from "../rating";
import { useAddReviewMutation } from "@shared/store/services/advOrdersService";
import { useToast } from "@shared/ui/shadcn-ui/ui/use-toast";

export const Feedback: FC<IOrderFeature> = ({ order_id }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [review, setReview] = useState("");
  const [grade, setGrade] = useState<number>(5);
  const [addReview] = useAddReviewMutation();
  const handleOnClick = () => {
    order_id &&
      addReview({ order_id, review, grade })
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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className={styles.button}>
          {t(`order_btn.feedback.btn_title`)}
          <StarIcon2 />
        </div>
      </PopoverTrigger>
      <PopoverContent className="rounded-[10px] p-0 w-full h-full" align="end">
        <div className={styles.popover}>
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
            <p className={styles.comment__send_icon} onClick={handleOnClick}>
              <SendHorizonal />
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
