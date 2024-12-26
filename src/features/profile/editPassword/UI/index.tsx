import { IPasswordData, useEditProfileMutation } from "@entities/user";
import { AccountsLoader, MyButton, ToastAction, useToast } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface EditPasswordProps {
  password: IPasswordData;
}

export const EditPassword: FC<EditPasswordProps> = ({ password }) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [edit, { isLoading }] = useEditProfileMutation();
  const isValid = Object.values(password).every(
    (value) => value !== undefined && value !== null && value !== "",
  );
  const handleOnClick = () => {
    if (password?.new_password !== password?.accept_password) {
      toast({
        variant: "error",
        title: t("toasts.profile.edit.password.nonEqual"),
      });
    } else {
      isValid &&
        edit(password)
          .unwrap()
          .then(() => {
            toast({
              variant: "success",
              title: t("toasts.profile.edit.password.success"),
            });
          })
          .catch((error) => {
            toast({
              variant: "error",
              title: t("toasts.profile.edit.password.error"),
              action: <ToastAction altText="Ok">Ok</ToastAction>,
            });
            console.error("error: ", error);
          });
    }
  };
  return (
    <MyButton onClick={handleOnClick} disabled={!isValid}>
      <p>{t("profile.password_block.change_btn")}</p>
      {isLoading && (
        <div className={styles.loader}>
          <AccountsLoader />
        </div>
      )}
    </MyButton>
  );
};
