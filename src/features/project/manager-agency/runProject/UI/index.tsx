import { useNavigate } from "react-router-dom";
import {
  invalidateManagerProjectByLaunchProject,
  invalidateManagerAgencyProjectByLaunchProject,
  projectStatus,
  useLaunchAgencyProjectMutation,
  useLaunchProjectMutation,
  ENUM_MANAGER_PROJECT_TYPES,
  ENUM_MANAGER_PROJECT_STATUS,
  ENUM_AGENCY_PROJECT_TYPES,
  ENUM_AGENCY_PROJECT_STATUS,
} from "@entities/project";
import { useFindLanguage } from "@entities/user";
import { useAppDispatch } from "@shared/hooks";
import { MyButton, useToast } from "@shared/ui";
import { Loader, Rocket } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { ENUM_PATHS } from "@shared/routing";

interface LaunchProjectProps {
  project_id: string;
  status: projectStatus;
  isAgency?: boolean;
}

export const LaunchProject: FC<LaunchProjectProps> = ({
  project_id,
  status,
  isAgency = false,
}) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [launchProject, { isLoading }] = useLaunchProjectMutation();
  const [launchAgencyProject, { isLoading: isLaunchAgencyProjectLoading }] =
    useLaunchAgencyProjectMutation();
  const dispatch = useAppDispatch();
  const language = useFindLanguage();
  const navigate = useNavigate();

  const handleOnClick = async () => {
    if (!project_id || isLoading) return;

    try {
      if (isAgency) {
        await launchAgencyProject({ project_id }).unwrap();
        invalidateManagerAgencyProjectByLaunchProject({
          dispatch,
          project_id,
        });
      } else {
        await launchProject({ project_id }).unwrap();
        invalidateManagerProjectByLaunchProject({
          dispatch,
          project_id,
          language,
        });
      }
      toast({
        variant: "success",
        title: t("toasts.orders_manager.launch_project.success"),
      });
      navigate(
        isAgency
          ? `${ENUM_PATHS.ORDERS}?project_type=${ENUM_AGENCY_PROJECT_TYPES.MY_PROJECT}&project_status=${ENUM_AGENCY_PROJECT_STATUS.ACTIVE}`
          : `${ENUM_PATHS.ORDERS}?project_type=${ENUM_MANAGER_PROJECT_TYPES.TURNKEY_PROJECT}&project_status=${ENUM_MANAGER_PROJECT_STATUS.ACTIVE}`,
      );
    } catch (error) {
      toast({
        variant: "error",
        title: t("toasts.orders_manager.launch_project.error"),
      });
      console.error("error: ", error);
    }
  };
  return (
    <MyButton
      onClick={handleOnClick}
      className={styles.button}
      buttons_type="button__white"
      disabled={!isAgency ? status !== projectStatus.approved : false}
    >
      <Rocket className="size-5 stroke-[1.5px]" />
      <p>{t("orders_manager.card.run_btn")}</p>
      {(isLoading || isLaunchAgencyProjectLoading) && (
        <Loader className="animate-spin" stroke="#fff" width={20} height={20} />
      )}
    </MyButton>
  );
};
