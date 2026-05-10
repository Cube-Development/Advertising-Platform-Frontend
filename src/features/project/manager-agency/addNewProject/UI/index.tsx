import { useCreateAgencyProjectMutation } from "@entities/project";
import { PlusIcon2 } from "@shared/assets";
import { ENUM_PATHS } from "@shared/routing";
import { MyButton, useToast } from "@shared/ui";
import { buildPathWithQuery } from "@shared/utils";
import { Loader } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";

interface AddAgencyNewProjectProps {}

export const AddAgencyNewProject: FC<AddAgencyNewProjectProps> = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  // запрос на создание нового проекта
  const [createAgencyProject, { isLoading: isLoadingCreateAgencyProject }] =
    useCreateAgencyProjectMutation();

  const handleOnClick = () => {
    createAgencyProject()
      .unwrap()
      .then((data) => {
        if (data?.project_id) {
          navigate(
            buildPathWithQuery(ENUM_PATHS.CATALOG, {
              save_project: data.project_id,
            }),
          );
        } else {
          navigate(ENUM_PATHS.CATALOG);
        }
      })
      .catch(() => {
        toast({
          variant: "error",
          title: "error...",
        });
      });
  };

  return (
    <div className={styles.wrapper} onClick={handleOnClick}>
      <MyButton className={styles.button}>
        <div className="min-w-[240px] flex items-center justify-center">
          {isLoadingCreateAgencyProject ? (
            <Loader
              className="animate-spin"
              stroke="#fff"
              width={20}
              height={20}
            />
          ) : (
            <p className="flex items-center justify-between gap-2">
              {t(`orders_advertiser.new_project`)} <PlusIcon2 />
            </p>
          )}
        </div>
      </MyButton>
    </div>
  );
};
