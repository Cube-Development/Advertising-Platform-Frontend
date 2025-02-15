import { IUserData, useEditProfileMutation } from "@entities/user";
import { MyButton, ToastAction, useToast } from "@shared/ui";
import { Loader } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface EditUserProps {
  user: IUserData;
}

export const EditUser: FC<EditUserProps> = ({ user }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [edit, { isLoading }] = useEditProfileMutation();
  const isValid = Object.values(user?.user_additional).every(
    (value) => value !== undefined && value !== null && value !== "",
  );
  const handleOnClick = () => {
    isValid &&
      !isLoading &&
      edit(user)
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.profile.edit.user.success"),
          });
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.profile.edit.user.error"),
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
          console.error("error: ", error);
        });
  };
  return (
    <MyButton onClick={handleOnClick} disabled={!isValid}>
      <p>{t("profile.account_block.save_btn")}</p>
      {isLoading && (
        <Loader className="animate-spin" stroke="#fff" width={20} height={20} />
      )}
    </MyButton>
  );
};
