import { FC } from "react";
import { MyButton } from "@shared/ui";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface RejectComplaintProps {
  id: string;
}

export const RejectComplaint: FC<RejectComplaintProps> = ({ id }) => {
  const { t } = useTranslation();
  return (
    <MyButton buttons_type="button__orange_light">
      <p>{t("admin_panel.complaintInfo.card.buttons.reject")}</p>
    </MyButton>
  );
};
