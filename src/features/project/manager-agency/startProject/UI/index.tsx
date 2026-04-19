import { ArrowLongHorizontalIcon } from "@shared/assets";
import { ENUM_PATHS } from "@shared/routing";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

import { buildPathWithQuery } from "@shared/utils";

interface StartProjectProps {
  project_id: string;
}

export const StartProject: FC<StartProjectProps> = ({ project_id }) => {
  const { t } = useTranslation();

  return (
    <Link
      to={buildPathWithQuery(ENUM_PATHS.CATALOG, { save_project: project_id })}
      className={styles.wrapper}
    >
      <MyButton className={styles.button}>
        <p>{t("orders_manager.card.start_btn")}</p>
        <ArrowLongHorizontalIcon className="icon__white" />
      </MyButton>
    </Link>
  );
};
