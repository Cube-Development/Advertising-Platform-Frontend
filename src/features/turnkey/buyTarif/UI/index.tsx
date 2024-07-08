import { paths } from "@shared/routing";
import { usePostBuyTarifMutation } from "@shared/store/services/tarif";
import { MyButton } from "@shared/ui";
import { ToastAction } from "@shared/ui/shadcn-ui/ui/toast";
import { useToast } from "@shared/ui/shadcn-ui/ui/use-toast";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export const BuyTarif: FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [buyTarif] = usePostBuyTarifMutation();
  const tarif = { tariff_ident: 1, comment: "", links: [], attached_files: [] };

  const handleOnClick = () => {
    buyTarif(tarif)
      .unwrap()
      .then(() => {
        toast({
          variant: "success",
          title: "Тариф куплен",
        });
      })
      .catch((error) => {
        toast({
          variant: "error",
          title: "Ошибка покупки тарифа",
          action: <ToastAction altText="Ok">Ok</ToastAction>,
        });
        console.error("error: ", error);
      });
  };
  return (
    <Link to={paths.turnkey}>
      <MyButton className={styles.button} onClick={handleOnClick}>
        {t(`buy`)}
      </MyButton>
    </Link>
  );
};
