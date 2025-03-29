import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { MyButton, SpinnerLoaderSmall } from "@shared/ui";
import { RobotIcon } from "@shared/assets";

interface AiFilterProps {
  isLoading: boolean;
  onChange: () => void;
}

export const AiFilter: FC<AiFilterProps> = ({ isLoading, onChange }) => {
  const { t } = useTranslation();
  console.log("aiLoading", isLoading);
  return (
    <MyButton
      buttons_type="button__white"
      className={styles.button}
      onClick={onChange}
    >
      {isLoading ? (
        <SpinnerLoaderSmall />
      ) : (
        <>
          <RobotIcon />
          {t(`catalog.generation_btn`)}
        </>
      )}
    </MyButton>
  );
};
