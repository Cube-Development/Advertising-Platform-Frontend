import { useAdminRejectReviewMutation } from "@entities/admin";
import { AccountsLoader, MyButton, useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface RejectReviewProps {
  id: string;
}

export const RejectReview: FC<RejectReviewProps> = ({ id }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [rejectReview, { isLoading }] = useAdminRejectReviewMutation();
  const handleOnClick = () => {
    id &&
      !isLoading &&
      rejectReview({ id })
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.admin.review.reject.success"),
          });
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.admin.review.reject.error"),
          });
          console.error("error: ", error);
        });
  };
  return (
    <MyButton buttons_type="button__orange_light" onClick={handleOnClick}>
      <p>{t("admin_panel.reviews.card.buttons.reject")}</p>
      {isLoading && (
        <div className="loader">
          <AccountsLoader />
        </div>
      )}
    </MyButton>
  );
};
