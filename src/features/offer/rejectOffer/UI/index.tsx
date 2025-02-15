import { MyButton, ToastAction, useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import { IOrderFeature } from "@entities/project";
import { bloggerOffersAPI, useCancelOfferMutation } from "@entities/offer";
import { Loader } from "lucide-react";
import { useAppDispatch } from "@shared/hooks";

export const RejectOffer: FC<IOrderFeature> = ({ order_id }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const handleInvalidateCache = () => {
    dispatch(bloggerOffersAPI.util.resetApiState());
  };
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
          handleInvalidateCache();
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
