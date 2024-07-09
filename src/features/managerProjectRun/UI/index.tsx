import { ArrowLongHorizontalIcon } from "@shared/assets";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ManagerProjectRunProps {
  is_request_approve: boolean;
}

export const ManagerProjectRun: FC<ManagerProjectRunProps> = ({
  is_request_approve,
}) => {
  const { t } = useTranslation();
  return (
    <MyButton
      className={`${styles.button} ${is_request_approve ? "" : "deactive"}`}
    >
      <p>{t("orders_manager.card.run_btn")}</p>
      <ArrowLongHorizontalIcon className="default__icon__white" />
    </MyButton>
  );
};
