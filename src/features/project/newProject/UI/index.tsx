import { PlusIcon2 } from "@shared/assets";
import { paths } from "@shared/routing";
import { IStartProjectProps } from "@shared/types/common";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export const NewProject: FC<IStartProjectProps> = ({ listLength }) => {
  const { t } = useTranslation();

  return (
    <Link to={paths.catalog}>
      <MyButton buttons_type="button__blue" className={styles.button}>
        {listLength
          ? t(`orders_advertiser.new_project`)
          : t(`orders_advertiser.start_new_project`)}
        <PlusIcon2 />
      </MyButton>
    </Link>
  );
};
