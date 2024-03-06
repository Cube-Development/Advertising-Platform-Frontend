import { KeyIcon } from "@shared/assets";
import { paths } from "@shared/routing";
import { IStartProjectProps } from "@shared/types/common";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export const TurnkeyProject: FC<IStartProjectProps> = ({ isZeroProject }) => {
  const { t } = useTranslation();

  return (
    <Link to={paths.catalog}>
      <MyButton
        className={`${styles.button} ${isZeroProject ? styles.new__turnkey : ""}`}
      >
        {isZeroProject
          ? t(`orders_advertiser.start_turnkey_project`)
          : t(`orders_advertiser.turnkey_project`)}
        <KeyIcon />
      </MyButton>
    </Link>
  );
};
