import {
  ComplaintDescription,
  ComplaintDetails,
  useGetAdminOrderComplaintInfoQuery,
} from "@entities/admin";
import {
  AcceptComplaint,
  ComplaintDecision,
  RejectComplaint,
} from "@features/adminPanel";
import { useClearCookiesOnPage } from "@shared/hooks";
import { paths } from "@shared/routing";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import styles from "./styles.module.scss";

export const ComplaintInfo: FC = () => {
  useClearCookiesOnPage();
  const { t } = useTranslation();
  const { id: complaint_id } = useParams<{ id: string }>();

  const {
    data: card,
    isLoading,
    isFetching,
  } = useGetAdminOrderComplaintInfoQuery({
    id: complaint_id || "",
  });

  // const card = AdmiinComplaintInfo;
  return (
    <div className="container">
      <div className={styles.wrapper}>
        <div className={styles.top}>
          <Link to={paths.adminComplaints}>
            <h1>{t("admin_panel.pages.complaints")}</h1>
          </Link>
          <Link to={paths.adminComplaints}>
            <p>
              {t("admin_panel.pages.moderation")}
              <span>
                {" "}
                / {t("admin_panel.pages.complaints")} / #{complaint_id}
              </span>
            </p>
          </Link>
        </div>
        {card && (
          <div className={styles.table}>
            <ComplaintDescription card={card} />
            <ComplaintDetails card={card} />
            <ComplaintDecision
              card={card}
              AcceptBtn={AcceptComplaint}
              RejectBtn={RejectComplaint}
            />
          </div>
        )}
      </div>
    </div>
  );
};
