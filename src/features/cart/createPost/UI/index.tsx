import { ArrowLongHorizontalIcon, LoginIcon } from "@shared/assets";
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
import styles from "./styles.module.scss";
import { useAppSelector } from "@shared/hooks";
import { CircleX } from "lucide-react";
import { Link } from "react-router-dom";
import { paths } from "@shared/routing";

interface CreatePostProps {
  onClick?: () => void;
}

export const CreatePost: FC<CreatePostProps> = ({ onClick }) => {
  const { t } = useTranslation();
  const { isAuth } = useAppSelector((state) => state.user);

  return (
    <>
      {isAuth ? (
        <MyButton
          buttons_type="button__green"
          onClick={onClick}
          className={styles.button}
        >
          <p>{t(`cart_btn.create_post`)}</p>
          <ArrowLongHorizontalIcon className="icon__white" />
        </MyButton>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <MyButton buttons_type="button__green" className={styles.button}>
              <p>{t(`cart_btn.create_post`)}</p>
              <ArrowLongHorizontalIcon className="icon__white" />
            </MyButton>
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
