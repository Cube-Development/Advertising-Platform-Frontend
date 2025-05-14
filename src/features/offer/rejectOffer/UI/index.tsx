import {
  invalidateBloggerOfferByAction,
  offerStatusFilter,
  useCancelOfferMutation,
} from "@entities/offer";
import { IOrderFeature } from "@entities/project";
import { ENUM_ROLES } from "@entities/user";
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
  const handleOnClick = () => {
    order_id &&
      !isLoading &&
      cancelOffer({ order_id })
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.offers_blogger.reject_offer.success"),
          });
          invalidateBloggerOfferByAction({
            dispatch,
            role: ENUM_ROLES.BLOGGER,
            order_id,
            status: offerStatusFilter.wait,
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
      {isLoading ? (
        <Loader className="animate-spin" stroke="#fff" width={20} height={20} />
      ) : (
        <p>{t(`offer_btn.reject`)}</p>
      )}
    </MyButton>
  );
};
