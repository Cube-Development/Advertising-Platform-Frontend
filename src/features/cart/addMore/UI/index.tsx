import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { ENUM_PATHS } from "@shared/routing";
import {
  buildPathWithQuery,
  queryParamKeys,
  QueryParamsUUID,
} from "@shared/utils";

export const AddMore: FC = () => {
  const { t } = useTranslation();
  const saveProjectId = QueryParamsUUID(queryParamKeys.saveProject);

  const catalogPath = saveProjectId
    ? buildPathWithQuery(ENUM_PATHS.CATALOG, {
        [queryParamKeys.saveProject]: saveProjectId,
      })
    : ENUM_PATHS.CATALOG;

  return (
    <Link to={catalogPath} className="h-full">
      <MyButton className={`${styles.button} truncate h-full`}>
        {t(`cart_btn.add`)}
      </MyButton>
    </Link>
  );
};
