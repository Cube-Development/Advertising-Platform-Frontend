import {
  IAdminBanChannelReq,
  useAdminChannelBanMutation,
} from "@entities/admin-panel";
import {
  AccountsLoader,
  CustomCloseButton,
  CustomInput,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  MyButton,
  useToast,
} from "@shared/ui";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DATE_VALIDATE, REASON_VALIDATE } from "../model";

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
  } = useForm<IAdminBanChannelReq>({
    defaultValues: {
      channel_id: id,
      reason: "",
      finish_date: "",
    },
  });

  const formState = watch();

  const onSubmit = async () => {
    if (isLoading || !id) return;

    setOpen(false);

    try {
      await banChannel({ ...formState }).unwrap();
      toast({
        variant: "success",
        title: t("toasts.admin.channel.ban.success"),
      });
    } catch (error) {
      toast({
        variant: "error",
        title: t("toasts.admin.channel.ban.error"),
      });
      console.error("error: ", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MyButton buttons_type="button__orange_light">
          <p>{t("admin_panel.channels.card.buttons.ban")}</p>
          {isLoading && (
            <div className="loader">
              <AccountsLoader />
            </div>
          )}
        </MyButton>
      </DialogTrigger>
      <DialogContent className="">
        <DialogClose asChild>
          <CustomCloseButton className="translate-y-0 top-1" />
        </DialogClose>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8">
          <div className="grid gap-8">
            <DialogTitle className="">
              {t("admin_panel.channels.card.ban.title")}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Why ban channel
            </DialogDescription>
            <div className="grid gap-4">
              <CustomInput
                {...register("reason", REASON_VALIDATE?.validate)}
                maxLength={255}
                label={t("admin_panel.channels.card.ban.reason.title")}
                placeholder={t(
                  "admin_panel.channels.card.ban.reason.default_value",
                )}
                value={formState?.reason}
                type="text"
                error={errors?.reason}
                error_message={
                  errors?.reason?.message ? t(errors?.reason?.message) : ""
                }
              />
              <CustomInput
                {...register("finish_date", DATE_VALIDATE?.validate)}
                label={t("admin_panel.channels.card.ban.date.title")}
                placeholder={t(
                  "admin_panel.channels.card.ban.date.default_value",
                )}
                value={formState?.finish_date}
                type="text"
                error={errors?.finish_date}
                error_message={
                  errors?.finish_date?.message
                    ? t(errors?.finish_date?.message)
                    : ""
                }
              />
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
