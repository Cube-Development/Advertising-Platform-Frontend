import { FC } from "react";
import { MyButton } from "@shared/ui";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface RejectReviewProps {
  id: string;
}

export const RejectReview: FC<RejectReviewProps> = ({ id }) => {
  const { t } = useTranslation();
  return (
    <MyButton buttons_type="button__orange_light">
      <p>{t("admin_panel.reviews.card.buttons.reject")}</p>
    </MyButton>
  );
};
