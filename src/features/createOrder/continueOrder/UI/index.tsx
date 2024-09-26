import { FC } from "react";
import { MyButton } from "@shared/ui";
import { ArrowLongHorizontalIcon } from "@shared/assets";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface ContinueOrderProps {
  onClick: () => void;
}

export const ContinueOrder: FC<ContinueOrderProps> = (props) => {
  const { t } = useTranslation();
  return (
    <MyButton type="button" buttons_type="button__blue" {...props}>
      {t(`order_btn.continue`)}
      <div className={styles.icon}>
        <ArrowLongHorizontalIcon className="icon__white" />
      </div>
    </MyButton>
  );
};
