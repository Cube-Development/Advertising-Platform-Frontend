import { useAdminRejectComplaintMutation } from "@entities/admin";
import { MyButton, ToastAction, useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface RejectComplaintProps {
  id: string;
}

export const RejectComplaint: FC<RejectComplaintProps> = ({ id }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [rejectComplaint] = useAdminRejectComplaintMutation();
  const handleOnClick = () => {
    id &&
      rejectComplaint({ complaint_id: id })
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.admin.complaint.reject.success"),
          });
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.admin.complaint.reject.error"),
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
          console.error("error: ", error);
        });
  };
  return (
    <MyButton buttons_type="button__orange_light" onClick={handleOnClick}>
      <p>{t("admin_panel.complaintInfo.card.buttons.reject")}</p>
    </MyButton>
  );
};
