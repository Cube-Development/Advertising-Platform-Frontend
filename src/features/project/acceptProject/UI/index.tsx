import { useApproveAdvManagerProjectMutation } from "@entities/project";
import { MyButton, ToastAction, useToast } from "@shared/ui";
import { Loader } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface AcceptProjectProps {
  project_id: string;
}

export const AcceptProject: FC<AcceptProjectProps> = ({ project_id }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [approveAdvManagerProject, { isLoading }] =
    useApproveAdvManagerProjectMutation();
  const handleOnClick = () => {
    project_id &&
      !isLoading &&
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
      <p>{t(`order_btn.accept`)}</p>
      {isLoading && (
        <Loader className="animate-spin" stroke="#fff" width={20} height={20} />
      )}
    </MyButton>
  );
};
