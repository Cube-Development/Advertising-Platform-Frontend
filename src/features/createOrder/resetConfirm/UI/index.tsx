import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
  MyButton,
} from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface ResetConfirmButtonProps {
  label: string;
  confirmMessage: string;
  onConfirm: () => void;
}

export const ResetConfirmButton: FC<ResetConfirmButtonProps> = ({
  label,
  confirmMessage,
  onConfirm,
}) => {
  const { t } = useTranslation();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <MyButton type="button" buttons_type="button__white" className="!w-auto">
          {label}
        </MyButton>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-[25px] bg-white w-[90%] max-w-[400px] p-6 gap-5">
        <AlertDialogTitle className="text-lg font-medium text-center gradient_color">
          {confirmMessage}
        </AlertDialogTitle>
        <AlertDialogDescription className="sr-only">
          {confirmMessage}
        </AlertDialogDescription>
        <AlertDialogFooter className="grid grid-cols-2 gap-3 w-full sm:grid">
          <AlertDialogCancel asChild>
            <MyButton type="button" buttons_type="button__white" className="!w-auto">
              {t("create_order.datetime.cancel")}
            </MyButton>
          </AlertDialogCancel>
          <AlertDialogCancel
            onClick={onConfirm}
            asChild
          >
            <MyButton type="button" buttons_type="button__blue" className="!w-auto">
              {t("create_order.datetime.confirm_reset")}
            </MyButton>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
