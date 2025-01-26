import {
  emailChangeForm,
  IEmailData,
  useEditEmailAcceptMutation,
  useEditEmailRequestMutation,
} from "@entities/user";
import { formDataLength } from "@entities/wallet";
import { CancelIcon2 } from "@shared/assets";
import {
  AccountsLoader,
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
  MyButton,
  ToastAction,
  useToast,
} from "@shared/ui";
import { isValidEmail, isValidEmailCode } from "@shared/utils";
import { PenLine } from "lucide-react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

interface EditEmailFormProps extends IEmailData {
  isEmailChanged: boolean;
  code: string;
  isDialogOpen: boolean;
}

export const EditEmail: FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [editEmailRequest, { isLoading: isLoadingEmail }] =
    useEditEmailRequestMutation();
  const [sendCode, { isLoading: isLoadingCode }] = useEditEmailAcceptMutation();
  const {
    watch,
    setValue,
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<EditEmailFormProps>({
    defaultValues: {
      new_email: "",
      password: "",
      code: "",
      isEmailChanged: false,
      isDialogOpen: false,
    },
  });
  const formState = watch();
  const handleToChangeEmail = () => {
    if (
      formState?.new_email &&
      formState?.password &&
      !formState?.isEmailChanged
    ) {
      editEmailRequest({
        new_email: formState?.new_email,
        password: formState?.password,
      })
        .unwrap()
        .then(() => {
          reset({
            new_email: "",
            password: "",
            code: "",
            isEmailChanged: true,
            isDialogOpen: true,
          });
          toast({
            variant: "success",
            title: t("toasts.profile.edit.email.success"),
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
        })
        .catch((error) => {
          const message =
            error?.status === 400
              ? "toasts.profile.edit.email.exist"
              : "toasts.profile.edit.email.error";
          toast({
            variant: "error",
            title: t(message),
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
          console.log(error);
        });
    }
  };

  const handleSendCode = () => {
    if (formState?.code?.length === formDataLength.email_code) {
      sendCode({ code: parseInt(formState?.code) })
        .unwrap()
        .then(() => {
          toast({
            variant: "success",
            title: t("toasts.profile.edit.email_code.success"),
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
          handleClose();
        })
        .catch((error) => {
          toast({
            variant: "error",
            title: t("toasts.profile.edit.email_code.error"),
            action: <ToastAction altText="Ok">Ok</ToastAction>,
          });
          console.error("error: ", error);
        });
    }
  };

  const handleClose = () => {
    reset({
      new_email: "",
      password: "",
      code: "",
      isEmailChanged: false,
      isDialogOpen: false,
    });
  };

  return (
    <AlertDialog open={formState?.isDialogOpen}>
      <AlertDialogTrigger asChild>
        <div
          className={styles.trigger}
          onClick={() => setValue(emailChangeForm.isDialogOpen, true)}
        >
          <PenLine />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className={styles.content}>
        <AlertDialogDescription className="sr-only"></AlertDialogDescription>
        <div className={styles.top}>
          <AlertDialogTitle className={styles.title}>
            {t("profile.email_block.title")}
          </AlertDialogTitle>
          <AlertDialogCancel asChild>
            <div className={styles.close} onClick={handleClose}>
              <CancelIcon2 />
            </div>
          </AlertDialogCancel>
        </div>
        {!formState?.isEmailChanged ? (
          <form
            className={styles.bottom}
            onSubmit={handleSubmit(handleToChangeEmail)}
          >
            <div className={styles.parameters}>
              <div
                className={`${errors?.new_email ? "form_error" : ""} ${styles.parameter_row}`}
              >
                <span>{t("profile.email_block.new_email.title")}</span>
                <input
                  type="text"
                  className={errors?.new_email ? "input_error" : ""}
                  autoComplete="new-email"
                  value={formState?.new_email || ""}
                  {...register(
                    emailChangeForm.new_email,

                    {
                      required: t(
                        "profile.email_block.new_email.error.required",
                      ),
                      validate: {
                        valid: (value: string) =>
                          isValidEmail(value) ||
                          "profile.email_block.new_email.error.format",
                      },
                    },
                  )}
                />
                {errors?.new_email && (
                  <p className={styles.error_text}>
                    {t(errors?.new_email?.message || "")}
                  </p>
                )}
              </div>
              <div
                className={`${errors?.password ? "form_error" : ""} ${styles.parameter_row}`}
              >
                <span>{t("profile.email_block.password.title")}</span>
                <input
                  type="password"
                  className={errors?.password ? "input_error" : ""}
                  autoComplete="new-password"
                  value={formState?.password || ""}
                  {...register(emailChangeForm.password, {
                    required: t("profile.email_block.password.error.required"),
                  })}
                />
                {errors?.password && (
                  <p className={styles.error_text}>
                    {t(errors?.password?.message || "")}
                  </p>
                )}
              </div>
            </div>
            <MyButton>
              <p>{t("profile.email_block.change_btn")}</p>
              {isLoadingEmail && (
                <div className={styles.loader}>
                  <AccountsLoader />
                </div>
              )}
            </MyButton>
          </form>
        ) : (
          <form
            className={styles.bottom}
            onSubmit={handleSubmit(handleSendCode)}
          >
            <div
              className={`${errors?.code ? "form_error" : ""} ${styles.parameter_row}`}
            >
              <span>{t("profile.email_block.code.title")}</span>
              <input
                type="text"
                className={errors?.code ? "input_error" : ""}
                autoComplete="new-code"
                value={formState?.code || ""}
                maxLength={formDataLength.email_code}
                {...register(
                  emailChangeForm.code,

                  {
                    required: t("profile.email_block.code.error.required"),
                    validate: {
                      valid: (value: string) =>
                        isValidEmailCode(value) ||
                        "profile.email_block.code.error.format",
                    },
                  },
                )}
              />
              {errors?.code && (
                <p className={styles.error_text}>
                  {t(errors?.code?.message || "")}
                </p>
              )}
            </div>
            <div className={styles.buttons}>
              <MyButton
                buttons_type="button__white"
                onClick={() => setValue(emailChangeForm.isEmailChanged, false)}
              >
                {t("profile.email_block.back_btn")}
              </MyButton>
              <MyButton buttons_type="button__green" onClick={handleSendCode}>
                <p>{t("profile.email_block.send_btn")}</p>
                {isLoadingCode && (
                  <div className={styles.loader}>
                    <AccountsLoader />
                  </div>
                )}
              </MyButton>
            </div>
          </form>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};
