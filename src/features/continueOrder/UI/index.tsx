import { FC } from "react";
import styles from "./styles.module.scss";
import { MyButton } from "@shared/ui";
import { ArrowIcon2 } from "@shared/assets";
import { useTranslation } from "react-i18next";

interface ContinueOrderProps {
  onClick: () => void;
}

export const ContinueOrder: FC<ContinueOrderProps> = (props) => {
  const { t } = useTranslation();
  return (
    <MyButton className={styles.button} {...props}>
      <div>
        {t(`order_btn.continue`)}
        <ArrowIcon2 />
      </div>
    </MyButton>
  );
};
