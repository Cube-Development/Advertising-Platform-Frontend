import {
  ENUM_OFFER_STATUS,
  invalidateBloggerOfferByUserAction,
  useCancelOfferMutation,
} from "@entities/offer";
import { IOrderFeature } from "@entities/project";
import { useAppDispatch } from "@shared/hooks";
import { MyButton, ToastAction, useToast } from "@shared/ui";
import { Loader } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const RejectOffer: FC<IOrderFeature> = ({ order_id }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [cancelOffer, { isLoading }] = useCancelOfferMutation();
  const handleOnClick = async () => {
    if (!order_id || isLoading) return;

    try {
      await cancelOffer({ order_id }).unwrap();
      toast({
        variant: "success",
        title: t("toasts.offers_blogger.reject_offer.success"),
      });
      invalidateBloggerOfferByUserAction({
        dispatch,
        order_id,
        status: ENUM_OFFER_STATUS.WAIT,
      });
    } catch (error) {
      toast({
        variant: "error",
        title: t("toasts.offers_blogger.reject_offer.error"),
        action: <ToastAction altText="Ok">Ok</ToastAction>,
      });
      console.error("error: ", error);
    }
  };
  return (
    <MyButton
      onClick={handleOnClick}
      buttons_type="button__white"
      className={styles.button}
    >
      {isLoading ? (
        <Loader className="animate-spin" stroke="#fff" width={20} height={20} />
      ) : (
        <p>{t(`offer_btn.reject`)}</p>
      )}
    </MyButton>
  );
};
