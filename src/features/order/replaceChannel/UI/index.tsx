import {
  desireNum,
  IAdvProjectSubcard,
  IChangeOrder,
  useChangeOrderMutation,
} from "@entities/project";
import { CancelIcon2 } from "@shared/assets";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
  MyButton,
  ToastAction,
  useToast,
} from "@shared/ui";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ReplaceChannelProps {
  order: IAdvProjectSubcard;
}

export const ReplaceChannel: FC<ReplaceChannelProps> = ({ order }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [replace] = useChangeOrderMutation();
  const haveDesire = !!order?.desire.find(
    (el) => el.desire_type === desireNum.channel,
  );
  const { watch, register } = useForm<IChangeOrder>({
    defaultValues: {
      order_id: order?.id,
      desire: desireNum.channel,
      comment: haveDesire
        ? order?.desire.find((el) => el.desire_type === desireNum.channel)
            ?.comment
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
            title: t("toasts.orders_advertiser.replace.comment.success"),
          });
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.orders_advertiser.replace.comment.error"),
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
          console.error("error: ", error);
        });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <MyButton buttons_type="button__white" className={styles.trigger}>
          {t(`order_btn.changeChannel`)}
        </MyButton>
      </AlertDialogTrigger>
      <AlertDialogContent className={`${styles.content} ${styles.dialog}`}>
        <div className={styles.title}>
          <p className="gradient_color">
            {haveDesire
              ? t("orders_advertiser.subcard.replace.comment.desire")
              : t("orders_advertiser.subcard.replace.comment.title")}
          </p>
          <AlertDialogCancel asChild>
            <div className={styles.close}>
              <CancelIcon2 />
            </div>
          </AlertDialogCancel>
        </div>
        <textarea
          {...register("comment")}
          maxLength={300}
          disabled={haveDesire}
          placeholder={t(
            "orders_advertiser.subcard.replace.comment.placeholder",
          )}
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
