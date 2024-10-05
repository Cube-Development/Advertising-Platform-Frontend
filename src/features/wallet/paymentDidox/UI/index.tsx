import { ArrowLongHorizontalIcon } from "@shared/assets";
import { MyButton } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { Loader } from "lucide-react";

interface PaymentDidoxProps {
  isLoading: boolean;
}

export const PaymentDidox: FC<PaymentDidoxProps> = ({ ...props }) => {
  const { t } = useTranslation();
  const { isLoading } = props;
  return (
    <MyButton {...props} className={styles.button} type="submit">
      {isLoading ? (
        <Loader className="animate-spin" stroke="#fff" width={20} height={20} />
      ) : (
        <>
          {t(`topup_btn.send`)}
          <ArrowLongHorizontalIcon className="icon__white" />
        </>
      )}
    </MyButton>
  );
};
