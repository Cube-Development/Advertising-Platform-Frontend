import { desireStatus, IManagerProjectSubcard } from "@entities/project";
import { CancelIcon2 } from "@shared/assets";
import { BREAKPOINT } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
  MyButton,
} from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export interface ChangeChannelProps {
  order: IManagerProjectSubcard;
}

export const ChangeChannel: FC<ChangeChannelProps> = ({ order }) => {
  const { t } = useTranslation();
  const screen = useWindowWidth();
  const text = order?.desire?.find(
    (el) => el?.desire_type === desireStatus.replace_channel_request,
  )?.comment;

  return (
    <>
      {screen >= BREAKPOINT.MD ? (
        <Dialog>
          <DialogTrigger asChild>
            <MyButton
              buttons_type="button__white"
              className={`truncate ${styles.trigger}`}
            >
              {t(`order_btn.channel.manager.edit`)}
            </MyButton>
          </DialogTrigger>
          <DialogContent className={styles.content}>
            <DialogTitle className={styles.title}>
              <p className="gradient_color">
                {t("orders_manager.subcard.change.channel.desire")}
              </p>
              <DialogClose asChild>
                <div className={styles.close}>
                  <CancelIcon2 />
                </div>
              </DialogClose>
            </DialogTitle>
            <span className={styles.textarea}>{text}</span>

            <DialogClose asChild>
              <MyButton className={styles.button}>
                {t("orders_manager.subcard.change.button.ok")}
              </MyButton>
            </DialogClose>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer>
          <DrawerTrigger asChild>
            <MyButton
              buttons_type="button__white"
              className={`truncate ${styles.trigger}`}
            >
              {t(`order_btn.channel.manager.edit`)}
            </MyButton>
          </DrawerTrigger>
          <DrawerContent className={styles.content}>
            <DrawerTitle className={styles.title}>
              <p className="gradient_color">
                {t("orders_manager.subcard.change.channel.desire")}
              </p>
              <DrawerClose asChild>
                <div className={styles.close}>
                  <CancelIcon2 />
                </div>
              </DrawerClose>
            </DrawerTitle>
            <span className={styles.textarea}>{text}</span>

            <DrawerClose asChild>
              <MyButton className={styles.button}>
                {t("orders_manager.subcard.change.button.ok")}
              </MyButton>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
