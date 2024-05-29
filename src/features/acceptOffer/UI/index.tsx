import { useAcceptOfferMutation } from "@shared/store/services/bloggerOffersService";
import { IOrderFeature } from "@shared/types/order";
import { MyButton } from "@shared/ui";
import { ToastAction } from "@shared/ui/shadcn-ui/ui/toast";
import { useToast } from "@shared/ui/shadcn-ui/ui/use-toast";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const AcceptOffer: FC<IOrderFeature> = ({ order_id }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [acceptOffer] = useAcceptOfferMutation();
  const handleOnClick = () => {
    acceptOffer({ order_id })
      .unwrap()
      .then(() => {
        toast({
          variant: "success",
          title: t("toasts.offers_blogger.accept_offer.success"),
        });
      })
      .catch((error) => {
        toast({
          variant: "error",
          title: t("toasts.offers_blogger.accept_offer.error"),
          description: error,
          action: <ToastAction altText="Ok">Ok</ToastAction>,
        });
        console.error("error: ", error);
      });
  };
  return (
    <MyButton
      onClick={handleOnClick}
      buttons_type="button__white"
      className={styles.button}
    >
      {t(`offer_btn.accept`)}
    </MyButton>
  );
};
