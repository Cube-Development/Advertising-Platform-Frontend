import { BREAKPOINT } from "@shared/config";
import { useWindowWidth } from "@shared/hooks";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
  MyButton,
} from "@shared/ui";
import { UserPlus, XCircle } from "lucide-react";
import { ButtonHTMLAttributes, FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ModalContent } from "./ui";

interface LoginModalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  haveTrigger?: boolean;
}

export const LoginModal: FC<LoginModalProps> = ({
  open = false,
  setOpen = () => {},
  haveTrigger = true,
  onClick,
  ...props
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(open);
  const screen = useWindowWidth();

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleOpen = (open: boolean) => {
    setIsOpen(open);
    setOpen(open);
  };

  return (
    <>
      {screen > BREAKPOINT.MD ? (
        <Dialog open={isOpen} onOpenChange={handleOpen}>
          {haveTrigger && (
            <DialogTrigger asChild>
              <MyButton
                {...props}
                type="button"
                className="flex items-center justify-center gap-2 w-none"
                onClick={(e) => {
                  handleOpen(true);
                  onClick?.(e);
                }}
              >
                {t("organization.not_login.buttons.add")}
                <UserPlus size={18} />
              </MyButton>
            </DialogTrigger>
          )}

          <DialogContent className="frame !p-0 min-h-[650px] overflow-hidden max-w-[700px] w-[90vw]">
            <DialogTitle className="sr-only" />
            <DialogDescription className="sr-only" />
            <DialogClose
              className="absolute p-4 top-3 right-3"
              onClick={() => handleOpen(false)}
            >
              <XCircle size={24} className="text-white" />
            </DialogClose>
            <ModalContent />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isOpen} onOpenChange={handleOpen}>
          {haveTrigger && (
            <DrawerTrigger asChild>
              <MyButton
                {...props}
                type="button"
                className="flex items-center justify-center gap-2 w-none"
                onClick={(e) => {
                  handleOpen(true);
                  onClick?.(e);
                }}
              >
                {t("organization.not_login.buttons.add")}
                <UserPlus size={18} />
              </MyButton>
            </DrawerTrigger>
          )}

          <DrawerContent className="h-[100vh]">
            <DrawerTitle className="sr-only" />
            <DrawerDescription className="sr-only" />
            <div className="relative h-full overflow-y-scroll">
              <DrawerClose
                className="absolute p-4 top-3 right-3"
                onClick={() => handleOpen(false)}
              >
                <XCircle size={24} className="text-white" />
              </DrawerClose>
              <ModalContent />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
