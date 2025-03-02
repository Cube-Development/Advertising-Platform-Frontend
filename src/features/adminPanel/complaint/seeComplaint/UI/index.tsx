import { ArrowLongHorizontalIcon, CancelIcon2 } from "@shared/assets";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ChooseComplaintProps {
  id: string;
  ChooseBtn: FC<{ id: string }>;
}

export const SeeComplaint: FC<ChooseComplaintProps> = ({ id, ChooseBtn }) => {
  const { t } = useTranslation();

  return (
    <AlertDialog>
      <AlertDialogTrigger className={styles.trigger}>
        <ArrowLongHorizontalIcon className="icon__grey" />
      </AlertDialogTrigger>
      <AlertDialogContent className={styles.content}>
        <AlertDialogDescription className="sr-only"></AlertDialogDescription>
        <AlertDialogTitle className="sr-only"></AlertDialogTitle>
        <div className={styles.top}>
          <div className={styles.close}>
            <AlertDialogCancel>
              <CancelIcon2 />
            </AlertDialogCancel>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.text__wrapper}>
            <p>{t("admin_panel.complaints.choose.title")}</p>
            <span>{t("admin_panel.complaints.choose.text")}</span>
          </div>
          <ChooseBtn id={id} />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
