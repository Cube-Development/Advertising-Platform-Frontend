import { MyButton, ToastAction, useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { useApproveAdvManagerProjectMutation } from "@entities/project";

interface AcceptProjectProps {
  project_id: string;
}

export const AcceptProject: FC<AcceptProjectProps> = ({ project_id }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [approveAdvManagerProject] = useApproveAdvManagerProjectMutation();
  const handleOnClick = () => {
    project_id &&
      approveAdvManagerProject({ project_id })
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.orders_advertiser.manager_project.success"),
          });
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.orders_advertiser.manager_project.error"),
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
          console.error("error: ", error);
        });
  };
  return (
    <MyButton
      onClick={handleOnClick}
      buttons_type="button__white"
      className={styles.button}
    >
      {t(`order_btn.accept`)}
    </MyButton>
  );
};
