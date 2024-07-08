import { useCancelOfferMutation } from "@shared/store/services/bloggerOffersService";
import { IOrderFeature } from "@shared/types/order";
import { MyButton } from "@shared/ui";
import { ToastAction } from "@shared/ui/shadcn-ui/ui/toast";
import { useToast } from "@shared/ui/shadcn-ui/ui/use-toast";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const RejectOffer: FC<IOrderFeature> = ({ order_id }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [cancelOffer] = useCancelOfferMutation();
  const handleOnClick = () => {
    order_id &&
      cancelOffer({ order_id })
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.offers_blogger.reject_offer.success"),
          });
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.offers_blogger.reject_offer.error"),
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
      {t(`offer_btn.reject`)}
    </MyButton>
  );
};
