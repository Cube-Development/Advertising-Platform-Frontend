import { useLaunchProjectMutation } from "@entities/project";
import { MyButton, ToastAction, useToast } from "@shared/ui";
import { Loader } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface LaunchProjectProps {
  is_request_approve: boolean;
  project_id: string;
}

export const LaunchProject: FC<LaunchProjectProps> = ({
  is_request_approve,
  project_id,
}) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [launchProject, { isLoading }] = useLaunchProjectMutation();
  const handleOnClick = () => {
    project_id &&
      !isLoading &&
      launchProject({ project_id })
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.orders_manager.launch_project.success"),
          });
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.orders_manager.launch_project.error"),
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
          console.error("error: ", error);
        });
  };
  return (
    <MyButton
      onClick={handleOnClick}
      className={`${styles.button} ${is_request_approve ? "" : "deactive"}`}
      buttons_type="button__white"
    >
      <p>{t("orders_manager.card.run_btn")}</p>
      {isLoading && (
        <Loader className="animate-spin" stroke="#fff" width={20} height={20} />
      )}
    </MyButton>
  );
};
