import { FC } from "react";
import { MyButton } from "@shared/ui";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface AcceptReviewProps {
  id: string;
}

export const AcceptReview: FC<AcceptReviewProps> = ({ id }) => {
  const { t } = useTranslation();
  return (
    <MyButton buttons_type="button__green_light">
      <p>{t("admin_panel.reviews.card.buttons.accept")}</p>
    </MyButton>
  );
};
