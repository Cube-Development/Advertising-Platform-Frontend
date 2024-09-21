import { IAddChannelQuery } from "@entities/channel";
import { LoginIcon } from "@shared/assets";
import { useAppSelector } from "@shared/hooks";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
  MyButton,
} from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { CircleFadingPlus, CircleX } from "lucide-react";
import { paths } from "@shared/routing";

export const AddChannel: FC<IAddChannelQuery> = ({ props, path }) => {
  const { t } = useTranslation();
  const { isAuth } = useAppSelector((state) => state.user);

  return (
    <>
      {isAuth ? (
        <Link to={path} className={styles.button}>
          <MyButton {...props} className="w-auto">
            {t(`btn_add_platform`)} <CircleFadingPlus />
          </MyButton>
        </Link>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <MyButton {...props}>{t(`btn_add_platform`)}</MyButton>
          </DialogTrigger>
          <DialogContent className={`${styles.content} gap-[0px]`}>
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
              <p className={styles.text__call_to_action}>
                {t("registration_alert.call_to_action")}
              </p>
            </div>
            <DialogFooter className="pt-[20px]">
              <Link
                to={paths.login}
                className={`${styles.btns__login} truncate`}
              >
                {t("login")}
                <LoginIcon />
              </Link>
              <Link
                to={paths.registration}
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
