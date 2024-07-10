import { useRejectOrderMutation } from "@shared/store/services/advOrdersService";
import { ToastAction } from "@shared/ui/shadcn-ui/ui/toast";
import { useToast } from "@shared/ui/shadcn-ui/ui/use-toast";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shared/ui/shadcn-ui/ui/popover";
import { SendHorizonal } from "lucide-react";
import { IOrderFeature } from "@entities/project";

export const RejectPost: FC<IOrderFeature> = ({ order_id }) => {
  const [comment, setComment] = useState("");
  const { toast } = useToast();
  const [rejectOrder] = useRejectOrderMutation();
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
  return (
    <Popover>
      <PopoverTrigger asChild>
        <p className={styles.button}>{t(`order_btn.reject.btn_title`)}</p>
      </PopoverTrigger>
      <PopoverContent className="rounded-[10px] p-0 w-full h-full" align="end">
        <div className={styles.popover}>
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
              // placeholder={t("order_btn.reject.placeholder")}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              value={comment}
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
