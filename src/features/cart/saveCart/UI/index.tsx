import { MyButton, useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { SaveIcon } from "@shared/assets";

export const SaveCart: FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleSaveCart = () => {
    toast({
      variant: "warning",
      title: t("toasts.cart.save_cart_temporary_error"),
    });
  };

  return (
    <MyButton className={styles.button} onClick={handleSaveCart}>
      <SaveIcon />
      <p className="gradient_color">{t(`cart_btn.save`)}</p>
    </MyButton>
  );
};
