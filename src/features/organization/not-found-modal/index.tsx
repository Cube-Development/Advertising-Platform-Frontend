import { PROFILE_TYPE } from "@entities/wallet";
import { SirenIcon } from "@shared/assets";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  MyButton,
} from "@shared/ui";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { useWindowWidth } from "@shared/hooks";
import { BREAKPOINT } from "@shared/config";

interface INotFoundModalProps {
  type?: PROFILE_TYPE;
  isOpen?: boolean;
}

export const NotFoundModal: FC<INotFoundModalProps> = ({
  type,
  isOpen: isOpenStart = true,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(isOpenStart);

  useEffect(() => {
    setIsOpen(isOpenStart);
  }, [isOpenStart]);

  const type_text =
    type === PROFILE_TYPE.SELF_EMPLOYED_ACCOUNT
      ? t("add_organization.not_found.types.self_employed")
      : t("add_organization.not_found.types.legal");

  const screen = useWindowWidth();

  return (
    <>
      {screen >= BREAKPOINT.SM ? (
        <AlertDialog open={isOpen}>
          <AlertDialogContent className={styles.content}>
            <AlertDialogTitle className={styles.header}>
              <div className={styles.icon}>
                <SirenIcon />
              </div>
              <div className={styles.title}>
                {type_text} {t("add_organization.not_found.title")}
              </div>
            </AlertDialogTitle>
            <AlertDialogDescription className={styles.description}>
              {t("add_organization.not_found.text")}
              <a href="">{t("add_organization.not_found.link")}</a>
            </AlertDialogDescription>
            <div className={styles.buttons}>
              <AlertDialogCancel asChild>
                <MyButton
                  buttons_type="button__white"
                  onClick={() => setIsOpen(false)}
                >
                  {t("add_organization.not_found.buttons.cancel")}
                </MyButton>
              </AlertDialogCancel>
              <MyButton>
                {t("add_organization.not_found.buttons.register")}
              </MyButton>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Drawer open={isOpen}>
          <DrawerContent className={styles.content}>
            <DrawerTitle className={styles.header}>
              <div className={styles.icon}>
                <SirenIcon />
              </div>
              <div className={styles.title}>
                {type_text} {t("add_organization.not_found.title")}
              </div>
            </DrawerTitle>
            <DrawerDescription className={styles.description}>
              {t("add_organization.not_found.text")}
              <a href="">{t("add_organization.not_found.link")}</a>
            </DrawerDescription>
            <div className={styles.buttons}>
              <DrawerClose asChild>
                <MyButton
                  buttons_type="button__white"
                  onClick={() => setIsOpen(false)}
                >
                  {t("add_organization.not_found.buttons.cancel")}
                </MyButton>
              </DrawerClose>
              <MyButton>
                {t("add_organization.not_found.buttons.register")}
              </MyButton>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
