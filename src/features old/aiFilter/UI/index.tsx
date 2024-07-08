import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { MyButton } from "@shared/ui";
import { RobotIcon } from "@shared/assets";

interface AiFilterProps {
  onChange: () => void;
}

export const AiFilter: FC<AiFilterProps> = ({ onChange }) => {
  const { t } = useTranslation();
  return (
    <MyButton
      buttons_type="button__white"
      className={styles.button}
      onClick={onChange}
    >
      <RobotIcon />
      {t(`catalog.generation_btn`)}
    </MyButton>
  );
};
