import { LoginIcon } from "@shared/assets";
import { ENUM_PATHS } from "@shared/routing";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui";
import { CircleX } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./login-modal.module.scss";
import { useTranslation } from "react-i18next";
import { useCurrentPathEnum } from "@shared/hooks";

interface ILoginModalProps {
  trigger?: React.ReactNode;
  onClose?: () => void;
}

export const LoginModal: FC<ILoginModalProps> = ({
  trigger,
  onClose = () => {},
}) => {
  const { t } = useTranslation();
  const currentPath = useCurrentPathEnum();

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={`${styles.content} gap-[0px]`}>
        <DialogTitle className="sr-only" />
        <DialogDescription className="sr-only" />
        <DialogClose onClick={onClose}>
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
          <p className={styles.text__title}>{t("registration_alert.title")}</p>
          <p className={styles.text__description}>
            {t("registration_alert.description")}
          </p>
          <p className={styles.text__call_to_action}>
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
  );
};
