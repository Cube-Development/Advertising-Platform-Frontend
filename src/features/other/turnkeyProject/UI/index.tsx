import { KeyIcon } from "@shared/assets";
import { ENUM_PATHS } from "@shared/routing";
import { IStartProjectProps } from "@shared/types/common";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export const TurnkeyProject: FC<IStartProjectProps> = ({ listLength }) => {
  const { t } = useTranslation();

  return (
    <Link to={ENUM_PATHS.TURNKEY}>
      <MyButton
        // buttons_type={listLength ? "button__white" : "button__orange"}
        buttons_type={"button__orange"}
        className={styles.button}
      >
        <p>
          {listLength
            ? t(`orders_advertiser.turnkey_project`)
            : t(`orders_advertiser.start_turnkey_project`)}
        </p>
        <KeyIcon className="icon__white" />
      </MyButton>
    </Link>
  );
};
