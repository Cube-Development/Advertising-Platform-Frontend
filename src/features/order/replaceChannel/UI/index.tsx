import {
  desireStatus,
  IAdvProjectSubcard,
  IChangeOrder,
  projectStatus,
  useChangeOrderMutation,
} from "@entities/project";
import { CancelIcon2 } from "@shared/assets";
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
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
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
  status: projectStatus;
}

export const ReplaceChannel: FC<ReplaceChannelProps> = ({ order, status }) => {
  const { t } = useTranslation();
  const screen = useWindowWidth();
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
    <>
      {screen >= BREAKPOINT.MD ? (
        <Dialog>
          <DialogTrigger asChild>
            <MyButton
              buttons_type={
                haveDesire ? "button__green__outline" : "button__white"
              }
              className={styles.trigger}
              disabled={!haveDesire && status === projectStatus.approved}
            >
              {haveDesire
                ? t(`order_btn.channel.advertiser.process`)
                : t(`order_btn.channel.advertiser.edit`)}
            </MyButton>
          </DialogTrigger>
          <DialogContent className={styles.content}>
            <DialogDescription className="sr-only"></DialogDescription>
            <DialogTitle className={styles.title}>
              <p className="gradient_color">
                {haveDesire
                  ? t("orders_advertiser.subcard.replace.channel.desire")
                  : t("orders_advertiser.subcard.replace.channel.title")}
              </p>
              <DialogClose asChild>
                <div className={styles.close}>
                  <CancelIcon2 />
                </div>
              </DialogClose>
            </DialogTitle>
            <textarea
              {...register("comment")}
              className={styles.textarea}
              maxLength={300}
              disabled={haveDesire}
              placeholder={t(
                "orders_advertiser.subcard.replace.channel.placeholder",
              )}
            />
            <DialogClose asChild>
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
            </DialogClose>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer>
          <DrawerTrigger asChild>
            <MyButton
              buttons_type={
                haveDesire ? "button__green__outline" : "button__white"
              }
              className={styles.trigger}
              disabled={!haveDesire && status === projectStatus.approved}
            >
              {haveDesire
                ? t(`order_btn.channel.advertiser.process`)
                : t(`order_btn.channel.advertiser.edit`)}
            </MyButton>
          </DrawerTrigger>
          <DrawerContent className={styles.content}>
            <DrawerDescription className="sr-only"></DrawerDescription>
            <DrawerTitle className={styles.title}>
              <p className="gradient_color">
                {haveDesire
                  ? t("orders_advertiser.subcard.replace.channel.desire")
                  : t("orders_advertiser.subcard.replace.channel.title")}
              </p>
              <DrawerClose asChild>
                <div className={styles.close}>
                  <CancelIcon2 />
                </div>
              </DrawerClose>
            </DrawerTitle>
            <textarea
              {...register("comment")}
              className={styles.textarea}
              maxLength={300}
              disabled={haveDesire}
              placeholder={t(
                "orders_advertiser.subcard.replace.channel.placeholder",
              )}
            />
            <DrawerClose asChild>
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
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
