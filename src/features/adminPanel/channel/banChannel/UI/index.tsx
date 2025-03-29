import {
  adminAPI,
  adminBanChannelReq,
  useAdminChannelBanMutation,
} from "@entities/admin";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  MyButton,
  ToastAction,
  useToast,
} from "@shared/ui";
import { formatFullDate, isValidFullDate } from "@shared/utils";
import { CircleX } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface BanChannelProps {
  id: string;
}

export const BanChannel: FC<BanChannelProps> = ({ id }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [banChannel, { isLoading }] = useAdminChannelBanMutation();
  const [open, setOpen] = useState<boolean>(false);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<adminBanChannelReq>({
    defaultValues: {
      channel_id: id,
      reason: "",
      finish_date: "",
    },
  });

  const formState = watch();

  const reasonData = {
    validate: {
      required: "admin_panel.channels.card.ban.reason.error.required",
    },
  };

  const dateData = {
    validate: {
      required: "admin_panel.channels.card.ban.date.error.required",
      validate: {
        valid: (value: string) =>
          isValidFullDate(value) ||
          "admin_panel.channels.card.ban.date.error.required",
      },
      onChange: formatFullDate,
    },
  };

  const onSubmit = () => {
    setOpen(false);
    banChannel({ ...formState })
      .unwrap()
      .then(() => {
        toast({
          variant: "success",
          title: t("toasts.admin.channel.ban.success"),
        });
      })
      .catch((error) => {
        toast({
          variant: "error",
          title: t("toasts.admin.channel.ban.error"),
          action: <ToastAction altText="Ok">Ok</ToastAction>,
        });
        console.error("error: ", error);
      });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MyButton buttons_type="button__orange_light">
          <p>{t("admin_panel.channels.card.buttons.ban")}</p>
        </MyButton>
      </DialogTrigger>
      <DialogContent className={styles.content}>
        <DialogTitle className="sr-only"></DialogTitle>
        <DialogDescription className="sr-only"></DialogDescription>
        <DialogClose>
          <p className={styles.close}>
            <CircleX
              width={30}
              height={30}
              stroke="rgba(0,0,0,0.5)"
              strokeWidth={1.5}
            />
          </p>
        </DialogClose>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.blocks}>
            <p className={styles.title}>
              {t("admin_panel.channels.card.ban.title")}
            </p>
            <div className={styles.block}>
              <p className={styles.label}>
                {t("admin_panel.channels.card.ban.reason.title")}
              </p>
              <input
                placeholder={t(
                  "admin_panel.channels.card.ban.reason.default_value",
                )}
                className={`${styles.input} ${errors?.reason && styles.error}`}
                {...register("reason", reasonData?.validate)}
                type="text"
                maxLength={255}
              />
              {errors?.reason && (
                <p className={styles.error_text}>
                  {t(errors?.reason?.message || "")}
                </p>
              )}
            </div>
            <div className={styles.block}>
              <p className={styles.label}>
                {t("admin_panel.channels.card.ban.date.title")}
              </p>
              <input
                placeholder={t(
                  "admin_panel.channels.card.ban.date.default_value",
                )}
                className={`${styles.input} ${errors?.finish_date && styles.error}`}
                {...register("finish_date", dateData?.validate)}
                type="text"
              />
              {errors?.finish_date && (
                <p className={styles.error_text}>
                  {t(errors?.finish_date?.message || "")}
                </p>
              )}
            </div>
          </div>
          <MyButton buttons_type="button__orange_light" type="submit">
            <p>{t("admin_panel.channels.card.buttons.ban")}</p>
          </MyButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};
