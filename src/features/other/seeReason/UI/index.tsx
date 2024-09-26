import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  MyButton,
} from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { AlertCircle } from "lucide-react";

interface SeeReasonProps {
  reason?: string;
}

export const SeeReason: FC<SeeReasonProps> = ({ reason }) => {
  const { t } = useTranslation();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <MyButton
          buttons_type="button__white"
          className={`${styles.button} truncate`}
        >
          <p>{t(`platform_btn.reason.btn`)}</p>
        </MyButton>
      </AlertDialogTrigger>
      <AlertDialogContent className={styles.alert}>
        <AlertDialogHeader>
          <AlertDialogTitle className={styles.alert__title}>
            <div>
              <AlertCircle />
            </div>
            <p>{t("platform_btn.reason.title")}</p>
          </AlertDialogTitle>
          <AlertDialogDescription className={styles.alert__description}>
            <p className={styles.alert__description}>{reason}</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>
            <p className={styles.alert__btn}>
              {t("platform_btn.reason.okey_btn")}
            </p>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
