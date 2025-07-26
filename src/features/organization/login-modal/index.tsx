import { logoutEcp } from "@entities/user";
import { useAppDispatch } from "@shared/hooks";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  Button,
  MyButton,
} from "@shared/ui";
import { LogIn, LogOut, UserPlus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ModalContent } from "./ui";

interface LoginModalProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  open?: boolean;
  haveTrigger?: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  open = false,
  haveTrigger = true,
  ...props
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(open);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {haveTrigger && (
        <DialogTrigger asChild>
          <MyButton
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
