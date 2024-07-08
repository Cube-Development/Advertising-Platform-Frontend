import { MyButton } from "@shared/ui";
import { ButtonHTMLAttributes, FC } from "react";
import { useTranslation } from "react-i18next";

interface CreateLegalProps {
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}

export const CreateLegal: FC<CreateLegalProps> = ({ props }) => {
  const { t } = useTranslation();

  return (
    <MyButton type="submit" {...props}>
      {t(`btn_add_profile`)}
    </MyButton>
  );
};
