import { Dialog, DialogContent, DialogTrigger, MyButton } from "@shared/ui";
import { UserPlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ModalContent } from "./ui";
import { FC, ButtonHTMLAttributes, memo } from "react";

interface LoginModalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  open?: boolean;
  haveTrigger?: boolean;
}

export const LoginModalComponent: FC<LoginModalProps> = ({
  open = false,
  haveTrigger = true,
  ...props
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(open);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {haveTrigger && (
        <DialogTrigger asChild>
          <MyButton
            {...props}
            type="button"
            className="flex items-center justify-center gap-2 w-none"
          >
            {t("organization.not_login.buttons.add")}
            <UserPlus size={18} />
          </MyButton>
        </DialogTrigger>
      )}

      <DialogContent className="frame !p-0 min-h-[620px] overflow-hidden !max-w-none !w-auto">
        <ModalContent />
      </DialogContent>
    </Dialog>
  );
};

export const LoginModal = memo(LoginModalComponent);
