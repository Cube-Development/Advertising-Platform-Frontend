import { useAdminAcceptComplaintMutation } from "@entities/admin";
import { MyButton, ToastAction, useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface AcceptComplaintProps {
  id: string;
}

export const AcceptComplaint: FC<AcceptComplaintProps> = ({ id }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [acceptComplaint] = useAdminAcceptComplaintMutation();
  const handleOnClick = () => {
    id &&
      acceptComplaint({ complaint_id: id })
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.admin.complaint.accept.success"),
          });
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.admin.complaint.accept.error"),
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
          console.error("error: ", error);
        });
  };
  return (
    <MyButton buttons_type="button__green_light" onClick={handleOnClick}>
      <p>{t("admin_panel.complaintInfo.card.buttons.accept")}</p>
    </MyButton>
  );
};
