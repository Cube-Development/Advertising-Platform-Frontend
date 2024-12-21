import {
  adminRejectComplaintReq,
  useAdminRejectComplaintMutation,
} from "@entities/admin";
import { paths } from "@shared/routing";
import { MyButton, ToastAction, useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface RejectComplaintProps {
  params: adminRejectComplaintReq;
}

export const RejectComplaint: FC<RejectComplaintProps> = ({ params }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [rejectComplaint] = useAdminRejectComplaintMutation();
  const navigate = useNavigate();
  const handleOnClick = () => {
    params?.order_id &&
      params?.reason &&
      rejectComplaint(params)
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.admin.complaint.reject.success"),
          });
          navigate(paths.adminComplaints);
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
