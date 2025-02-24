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
import { Loader } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export interface ReplaceChannelProps {
  order: IAdvProjectSubcard;
  is_request_approve: boolean;
}

export const ReplaceChannel: FC<ReplaceChannelProps> = ({
  order,
  is_request_approve,
}) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [replace, { isLoading }] = useChangeOrderMutation();
  const haveDesire = !!order?.desire.find(
    (el) => el.desire_type === desireStatus.replace_channel_request,
  );
  const { watch, register } = useForm<IChangeOrder>({
    defaultValues: {
      order_id: order?.id,
      desire: desireStatus.replace_channel_request,
      comment: haveDesire
        ? order?.desire.find(
            (el) => el.desire_type === desireStatus.replace_channel_request,
          )?.comment
        : "",
    },
  });

  const formState = watch();
  const handleOnClick = () => {
    !isLoading &&
      formState.comment &&
      order?.id &&
      !isLoading &&
      replace(formState)
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.orders_advertiser.replace.channel.success"),
          });
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.orders_advertiser.replace.channel.error"),
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
          className={`truncate ${styles.trigger}`}
          disabled={!haveDesire && is_request_approve}
        >
          {haveDesire
            ? t(`order_btn.channel.advertiser.process`)
            : t(`order_btn.channel.advertiser.edit`)}
        </MyButton>
      </AlertDialogTrigger>
      <AlertDialogContent className={styles.content}>
        <AlertDialogTitle className={styles.title}>
          <p className="gradient_color">
            {haveDesire
              ? t("orders_advertiser.subcard.replace.channel.desire")
              : t("orders_advertiser.subcard.replace.channel.title")}
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
          disabled={haveDesire}
          placeholder={t(
            "orders_advertiser.subcard.replace.channel.placeholder",
          )}
        />
        <AlertDialogCancel asChild>
          {haveDesire ? (
            <MyButton>
              <p>{t("orders_advertiser.subcard.replace.button.ok")}</p>
            </MyButton>
          ) : (
            <MyButton onClick={handleOnClick}>
              <p>{t("orders_advertiser.subcard.replace.button.send")}</p>
              {isLoading && (
                <Loader
                  className="animate-spin"
                  stroke="#fff"
                  width={20}
                  height={20}
                />
              )}
            </MyButton>
          )}
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};
