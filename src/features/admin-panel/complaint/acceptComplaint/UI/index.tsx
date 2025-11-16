import {
  adminAcceptComplaintReq,
  useAdminAcceptComplaintMutation,
} from "@entities/admin";
import { ENUM_PATHS } from "@shared/routing";
import { AccountsLoader, MyButton, useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface AcceptComplaintProps {
  params: adminAcceptComplaintReq;
}

export const AcceptComplaint: FC<AcceptComplaintProps> = ({ params }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [acceptComplaint, { isLoading }] = useAdminAcceptComplaintMutation();
  const navigate = useNavigate();
  const handleOnClick = () => {
    params?.order_id &&
      params?.reason &&
      !isLoading &&
      acceptComplaint(params)
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.admin.complaint.accept.success"),
          });
          navigate(ENUM_PATHS.ADMIN_COMPLAINTS);
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.admin.complaint.accept.error"),
          });
          console.error("error: ", error);
        });
  };
  return (
    <MyButton buttons_type="button__green_light" onClick={handleOnClick}>
      <p>{t("admin_panel.complaintInfo.card.buttons.accept")}</p>
      {isLoading && (
        <div className="loader">
          <AccountsLoader />
        </div>
      )}
    </MyButton>
  );
};
