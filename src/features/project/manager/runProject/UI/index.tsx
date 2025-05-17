import {
  invalidateManagerProjectByLaunchProject,
  projectStatus,
  useLaunchProjectMutation,
} from "@entities/project";
import { ENUM_ROLES, useFindLanguage } from "@entities/user";
import { useAppDispatch } from "@shared/hooks";
import { MyButton, ToastAction, useToast } from "@shared/ui";
import { Loader } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface LaunchProjectProps {
  project_id: string;
  status: projectStatus;
}

export const LaunchProject: FC<LaunchProjectProps> = ({
  project_id,
  status,
}) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [launchProject, { isLoading }] = useLaunchProjectMutation();
  const dispatch = useAppDispatch();
  const language = useFindLanguage();

  const handleOnClick = () => {
    project_id &&
      !isLoading &&
      launchProject({ project_id })
        .unwrap()
        .then(() => {
          invalidateManagerProjectByLaunchProject({
            dispatch,
            project_id,
            language,
            role: ENUM_ROLES.MANAGER,
          });
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
      className={styles.button}
      buttons_type="button__white"
      disabled={status !== projectStatus.approved}
    >
      <p>{t("orders_manager.card.run_btn")}</p>
      {isLoading && (
        <Loader className="animate-spin" stroke="#fff" width={20} height={20} />
      )}
    </MyButton>
  );
};
