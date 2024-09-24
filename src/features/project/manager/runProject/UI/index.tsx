import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { MyButton } from "@shared/ui";
import { ArrowLongHorizontalIcon } from "@shared/assets";

interface RunProjectProps {
  is_request_approve: boolean;
}

export const RunProject: FC<RunProjectProps> = ({ is_request_approve }) => {
  const { t } = useTranslation();
  return (
    <MyButton
      className={`${styles.button} ${is_request_approve ? "" : "deactive"}`}
      buttons_type="button__white"
    >
      <p>{t("orders_manager.card.run_btn")}</p>
    </MyButton>
  );
};
