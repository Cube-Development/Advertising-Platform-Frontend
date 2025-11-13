import { MyButton } from "@shared/ui";
import { CloudCheck } from "lucide-react";
import { ButtonHTMLAttributes, FC } from "react";
import { useTranslation } from "react-i18next";

interface SaveProjectProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onAction?: () => void;
}

export const SaveProject: FC<SaveProjectProps> = ({ onAction, ...props }) => {
  const { t } = useTranslation();

  const handleOnClick = () => {
    onAction && onAction();
  };

  return (
    <MyButton
      buttons_type="button__orange"
      type="button"
      onClick={handleOnClick}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        <CloudCheck className="size-5 stroke-[2px] min-w-[20px]" />
        <p>{t(`create_order.save`)}</p>
      </div>
    </MyButton>
  );
};
