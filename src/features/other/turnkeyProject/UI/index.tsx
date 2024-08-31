import { KeyIcon } from "@shared/assets";
import { paths } from "@shared/routing";
import { IStartProjectProps } from "@shared/types/common";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export const TurnkeyProject: FC<IStartProjectProps> = ({ listLength }) => {
  const { t } = useTranslation();

  return (
    <Link to={paths.turnkey}>
      <MyButton
        buttons_type={listLength ? "button__white" : "button__orange"}
        className={styles.button}
      >
        {listLength
          ? t(`orders_advertiser.turnkey_project`)
          : t(`orders_advertiser.start_turnkey_project`)}
        <KeyIcon className="icon__white" />
      </MyButton>
    </Link>
  );
};
