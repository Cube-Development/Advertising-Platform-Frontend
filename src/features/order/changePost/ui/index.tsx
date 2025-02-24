import { desireStatus, IManagerProjectSubcard } from "@entities/project";
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
} from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export interface ChangePostProps {
  order: IManagerProjectSubcard;
}

export const ChangePost: FC<ChangePostProps> = ({ order }) => {
  const { t } = useTranslation();
  const screen = useWindowWidth();
  const text = order?.desire?.find(
    (el) => el?.desire_type === desireStatus.replace_post_request,
  )?.comment;
  return (
    <>
      {screen >= BREAKPOINT.MD ? (
        <Dialog>
          <DialogTrigger asChild>
            <MyButton buttons_type="button__white" className={styles.trigger}>
              {t(`order_btn.post.manager.edit`)}
            </MyButton>
          </DialogTrigger>
          <DialogContent className={styles.content}>
            <DialogTitle className={styles.title}>
              <p className="gradient_color">
                {t("orders_manager.subcard.change.post.desire")}
              </p>
              <DialogClose asChild>
                <div className={styles.close}>
                  <CancelIcon2 />
                </div>
              </DialogClose>
            </DialogTitle>
            <DialogDescription className={styles.textarea}>
              {text}
            </DialogDescription>
            <DialogClose asChild>
              <MyButton className={styles.button}>
                {t(`orders_manager.subcard.change.button.ok`)}
              </MyButton>
            </DialogClose>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer>
          <DrawerTrigger asChild>
            <MyButton buttons_type="button__white" className={styles.trigger}>
              {t(`order_btn.post.manager.edit`)}
            </MyButton>
          </DrawerTrigger>
          <DrawerContent className={styles.content}>
            <DrawerTitle className={styles.title}>
              <p className="gradient_color">
                {t("orders_manager.subcard.change.post.desire")}
              </p>
              <DrawerClose asChild>
                <div className={styles.close}>
                  <CancelIcon2 />
                </div>
              </DrawerClose>
            </DrawerTitle>
            <DrawerDescription className={styles.textarea}>
              {text}
            </DrawerDescription>
            <DrawerClose asChild>
              <MyButton className={styles.button}>
                {t(`orders_manager.subcard.change.button.ok`)}
              </MyButton>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
