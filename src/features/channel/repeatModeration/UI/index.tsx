import { ArrowLongHorizontalIcon } from "@shared/assets";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const RepeatModeration: FC = () => {
  const { t } = useTranslation();
  return (
    <MyButton
      buttons_type="button__blue"
      className={`${styles.button} truncate`}
    >
      {t(`platform_btn.repeat`)}
      <div>
        <ArrowLongHorizontalIcon className="icon__white" />
      </div>
    </MyButton>
  );
};
