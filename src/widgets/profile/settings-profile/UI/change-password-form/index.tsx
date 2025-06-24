import { FC } from "react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { cn } from "@shared/ui";
import { useForm } from "react-hook-form";
import { CHANGE_PASSWORD_DATA } from "../../model";
import { CustomBlockData } from "@shared/ui";
import { EditPassword } from "@features/profile";
import { IPasswordData } from "@entities/user";

interface IChangePasswordFormProps {
  // add your props here
}

export const ChangePasswordForm: FC<IChangePasswordFormProps> = ({}) => {
  const { t } = useTranslation();

  const {
    register,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IPasswordData>({
    defaultValues: {
      current_password: "",
      new_password: "",
      accept_password: "",
    },
  });
  const formState = watch();
  return (
    <div className={cn(styles.wrapper, "frame")}>
      <div className={styles.data}>
        <CustomBlockData
          data={CHANGE_PASSWORD_DATA}
          register={register}
          inputError={errors}
          isRow
        />
      </div>
      <div className={styles.button__wrapper}>
        <EditPassword password={formState} />
      </div>
    </div>
  );
};
