import {
  desireStatus,
  IAdvProjectSubcard,
  IChangeOrder,
  useChangeOrderMutation,
} from "@entities/project";
import { CancelIcon2 } from "@shared/assets";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
  MyButton,
  ToastAction,
  useToast,
} from "@shared/ui";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export interface ReplacePostProps {
  order: IAdvProjectSubcard;
  is_request_approve: boolean;
}

export const ReplacePost: FC<ReplacePostProps> = ({
  order,
  is_request_approve,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [replace] = useChangeOrderMutation();
  const haveDesire = !!order?.desire.find(
    (el) => el.desire_type === desireStatus.replace_post_request,
  );
  const { watch, register } = useForm<IChangeOrder>({
    defaultValues: {
      order_id: order?.id,
      desire: desireStatus.replace_post_request,
      comment: haveDesire
        ? order?.desire.find(
            (el) => el.desire_type === desireStatus.replace_post_request,
          )?.comment
        : "",
    },
  });

  const formState = watch();
  const handleOnClick = () => {
    formState.comment &&
      order?.id &&
      replace(formState)
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.orders_advertiser.replace.post.success"),
          });
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.orders_advertiser.replace.post.error"),
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
          console.error("error: ", error);
        });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <MyButton
          buttons_type="button__white"
          className={styles.trigger}
          disabled={!haveDesire && is_request_approve}
        >
          {t(`order_btn.changePost`)}
        </MyButton>
      </AlertDialogTrigger>
      <AlertDialogContent className={`${styles.content} ${styles.dialog}`}>
        <AlertDialogTitle className={styles.title}>
          <p className="gradient_color">
            {haveDesire
              ? t("orders_advertiser.subcard.replace.post.desire")
              : t("orders_advertiser.subcard.replace.post.title")}
          </p>
          <AlertDialogCancel asChild>
            <div className={styles.close}>
              <CancelIcon2 />
            </div>
          </AlertDialogCancel>
        </AlertDialogTitle>
        <textarea
          {...register("comment")}
          className={styles.textarea}
          maxLength={300}
          placeholder={t("orders_advertiser.subcard.replace.post.placeholder")}
          disabled={haveDesire}
        />
        <AlertDialogCancel asChild>
          {haveDesire ? (
            <MyButton className={styles.button}>
              {t("orders_advertiser.subcard.replace.button.ok")}
            </MyButton>
          ) : (
            <MyButton className={styles.button} onClick={handleOnClick}>
              {t("orders_advertiser.subcard.replace.button.send")}
            </MyButton>
          )}
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};
