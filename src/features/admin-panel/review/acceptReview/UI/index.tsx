import { useAdminAcceptReviewMutation } from "@entities/admin";
import { AccountsLoader, MyButton, useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface AcceptReviewProps {
  id: string;
}

export const AcceptReview: FC<AcceptReviewProps> = ({ id }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [acceptReview, { isLoading }] = useAdminAcceptReviewMutation();
  const handleOnClick = () => {
    id &&
      !isLoading &&
      acceptReview({ id })
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.admin.review.accept.success"),
          });
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.admin.review.accept.error"),
          });
          console.error("error: ", error);
        });
  };
  return (
    <MyButton buttons_type="button__green_light" onClick={handleOnClick}>
      <p>{t("admin_panel.reviews.card.buttons.accept")}</p>
      {isLoading && (
        <div className="loader">
          <AccountsLoader />
        </div>
      )}
    </MyButton>
  );
};
