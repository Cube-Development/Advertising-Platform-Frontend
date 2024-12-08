import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { AlertDialogCancel, DialogTitle, MyButton } from "@shared/ui";
import { IAdminComplaintInfoData } from "@entities/admin";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTrigger,
  useToast,
} from "@shared/ui";
import { CancelIcon2 } from "@shared/assets";

interface ComplaintDecisionProps {
  card: IAdminComplaintInfoData;
  AcceptBtn: FC<{ id: string }>;
  RejectBtn: FC<{ id: string }>;
}

export const ComplaintDecision: FC<ComplaintDecisionProps> = ({
  card,
  AcceptBtn,
  RejectBtn,
}) => {
  const { t } = useTranslation();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className={styles.trigger}>
        <MyButton>
          <p>{t("admin_panel.complaintInfo.card.buttons.decision")}</p>
        </MyButton>
      </AlertDialogTrigger>
      <AlertDialogContent className={styles.content}>
        <div className={styles.top}>
          <div className={styles.close}>
            <AlertDialogCancel>
              <CancelIcon2 />
            </AlertDialogCancel>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.text__wrapper}>
            <p className={styles.title}>
              {t("admin_panel.complaintInfo.card.title")}
            </p>
            <div className={styles.text}>
              <p>{card?.comment}</p>
            </div>
          </div>
          <div className={styles.decision}>
            <p className={styles.title}>
              {t("admin_panel.complaintInfo.card.decision.title")}
            </p>
            <div className={styles.buttons}>
              <AlertDialogCancel asChild>
                <div>
                  <RejectBtn id={card?.id} />
                </div>
              </AlertDialogCancel>
              <AlertDialogCancel asChild>
                <div>
                  <AcceptBtn id={card?.id} />
                </div>
              </AlertDialogCancel>
            </div>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
