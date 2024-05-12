import { ArrowLongHorizontalIcon } from "@shared/assets";
import { usePublishPostBloggerMutation } from "@shared/store/services/bloggerOffersService";
import { IOrderFeature } from "@shared/types/order";
import { MyButton } from "@shared/ui";
import { ToastAction } from "@shared/ui/shadcn-ui/ui/toast";
import { useToast } from "@shared/ui/shadcn-ui/ui/use-toast";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

export const SendLink: FC<IOrderFeature> = ({ url, order_id }) => {
  const { toast } = useToast();
  const [publishPostBlogger] = usePublishPostBloggerMutation();
  const { t } = useTranslation();
  const handleOnClick = () => {
    publishPostBlogger({ order_id, url })
      .unwrap()
      .then(() => {
        toast({
          variant: "success",
          title: t("toasts.offers_blogger.send_link.success"),
        });
        console.log("success");
      })
      .catch((error) => {
        toast({
          variant: "error",
          title: t("toasts.offers_blogger.send_link.error"),
          description: error,
          action: <ToastAction altText="Ok">Ok</ToastAction>,
        });
        console.error("error: ", error);
      });
  };
  return (
    <MyButton
      onClick={handleOnClick}
      buttons_type="button__blue"
      className={styles.button}
    >
      {t(`offer_btn.send_link`)}
      <ArrowLongHorizontalIcon className="default__icon__white" />
    </MyButton>
  );
};
