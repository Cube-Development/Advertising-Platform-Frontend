import { IAddChannelQuery } from "@entities/channel";
import { LoginIcon } from "@shared/assets";
import { useAppSelector, useCurrentPathEnum } from "@shared/hooks";
import { ENUM_PATHS } from "@shared/routing";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  MyButton,
} from "@shared/ui";
import { CircleFadingPlus, CircleX } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export const AddChannel: FC<IAddChannelQuery> = ({ props, path, orange }) => {
  const { t } = useTranslation();
  const { isAuth } = useAppSelector((state) => state.user);
  const currentPath = useCurrentPathEnum();

  return (
    <>
      {isAuth ? (
        <Link to={path}>
          <MyButton
            {...props}
            className={`${styles.button} ${orange ? styles.orange : ""}`}
          >
            <p>{t(`btn_add_platform`)}</p>
            <CircleFadingPlus />
          </MyButton>
        </Link>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <MyButton
              {...props}
              className={`${styles.button} ${orange ? styles.orange : ""}`}
            >
              <p>{t(`btn_add_platform`)}</p>
              <CircleFadingPlus />
            </MyButton>
          </DialogTrigger>
          <DialogContent className={`${styles.content} gap-[0px]`}>
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
            <div className={styles.text}>
              <p className={styles.text__title}>
                {t("registration_alert.title")}
              </p>
              <p className={styles.text__description}>
                {t("registration_alert.description")}
              </p>
              <p className={`gradient_color ${styles.text__call_to_action}`}>
                {t("registration_alert.call_to_action")}
              </p>
            </div>
            <DialogFooter className="pt-[20px]">
              <Link
                to={`${ENUM_PATHS.LOGIN}${currentPath}`}
                className={`${styles.btns__login} truncate`}
              >
                {t("login")}
                <LoginIcon />
              </Link>
              <Link
                to={`${ENUM_PATHS.REGISTRATION}${currentPath}`}
                className={`${styles.btns__register} truncate`}
              >
                {t("registration")}
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
