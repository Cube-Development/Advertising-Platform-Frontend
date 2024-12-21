import {
  adminAcceptComplaintReq,
  adminRejectComplaintReq,
  IAdminComplaintInfoData,
} from "@entities/admin";
import { CancelIcon2 } from "@shared/assets";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
  MyButton,
} from "@shared/ui";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { rolesTypes } from "@entities/user";

interface ComplaintDecisionProps {
  card: IAdminComplaintInfoData;
  AcceptBtn: FC<{ params: adminAcceptComplaintReq }>;
  RejectBtn: FC<{ params: adminRejectComplaintReq }>;
}

export const ComplaintDecision: FC<ComplaintDecisionProps> = ({
  card,
  AcceptBtn,
  RejectBtn,
}) => {
  const { t } = useTranslation();
  const [reason, setReason] = useState("");

  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 500) {
      setReason(e.target.value);
    }
  };
  const params = {
    order_id: card?.order_id,
    reason,
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className={styles.trigger}>
        <MyButton>
          {!card?.reason ? (
            <p>{t("admin_panel.complaintInfo.card.buttons.make_decision")}</p>
          ) : (
            <p>{t("admin_panel.complaintInfo.card.buttons.see_decision")}</p>
          )}
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
              <span>{card?.comment}</span>
            </div>
          </div>
          <div className={styles.decision}>
            {!card?.reason ? (
              <>
                <p className={styles.title}>
                  {t("admin_panel.complaintInfo.card.decision.title")}
                </p>
                <input
                  id="reason"
                  type="text"
                  value={reason}
                  onChange={handleReasonChange}
                  className={styles.input}
                  placeholder={t(
                    "admin_panel.complaintInfo.card.decision.placeholder",
                  )}
                />
              </>
            ) : (
              <>
                <p className={styles.title}>
                  {t("admin_panel.complaintInfo.card.decision.have_decision")}:{" "}
                  {t(
                    rolesTypes.find((el) => el.type === card?.role)?.name || "",
                  )}
                </p>
                <div className={styles.text}>
                  <span className={styles.text}>{card?.reason}</span>
                </div>
              </>
            )}
            {!card?.reason ? (
              <div className={styles.buttons}>
                <AlertDialogCancel asChild>
                  <div>
                    <RejectBtn params={params} />
                  </div>
                </AlertDialogCancel>
                <AlertDialogCancel asChild>
                  <div>
                    <AcceptBtn params={params} />
                  </div>
                </AlertDialogCancel>
              </div>
            ) : (
              <AlertDialogCancel asChild>
                <MyButton>
                  {t("admin_panel.complaintInfo.card.buttons.ok")}
                </MyButton>
              </AlertDialogCancel>
            )}
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
