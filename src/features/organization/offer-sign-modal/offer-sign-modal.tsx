import {
  ENUM_ORGANIZATION_STATUS,
  useGetOrganizationQuery,
} from "@entities/organization";
import { BREAKPOINT } from "@shared/config";
import { useAppSelector, useWindowWidth } from "@shared/hooks";
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
import { FilePen, XCircle } from "lucide-react";
import { ButtonHTMLAttributes, FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { OfferModalContent } from "./ui";
import { USER_ROLES } from "@entities/user";

interface OfferSignModalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  haveTrigger?: boolean;
}

export const OfferSignModal: FC<OfferSignModalProps> = ({
  open = false,
  haveTrigger = true,
  setOpen = () => {},
  onClick,
  ...props
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(open);
  const { isAuth, role } = useAppSelector((state) => state.user);
  const { data: organization } = useGetOrganizationQuery(undefined, {
    skip: !isAuth || !USER_ROLES.includes(role),
  });
  const screen = useWindowWidth();

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleOpen = (open: boolean) => {
    setIsOpen(open);
    setOpen(open);
  };

  if (organization?.status === ENUM_ORGANIZATION_STATUS.ACTIVE) return null;

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
                  setIsOpen(true);
                  onClick?.(e);
                }}
              >
                <FilePen size={18} />
                {t("organization.offer_sign.buttons.sign")}
              </MyButton>
            </DialogTrigger>
          )}

          <DialogContent className="frame !p-0  overflow-hidden max-w-[700px] w-[90vw]">
            <DialogTitle className="sr-only" />
            <DialogDescription className="sr-only" />
            <DialogClose
              className="absolute p-4 top-3 right-3"
              onClick={() => handleOpen(false)}
            >
              <XCircle size={24} className="text-black" />
            </DialogClose>
            <OfferModalContent offer_id={organization?.offer_id || ""} />
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
                <FilePen size={18} />
                {t("organization.offer_sign.buttons.sign")}
              </MyButton>
            </DrawerTrigger>
          )}

          <DrawerContent className="h-[100vh]">
            <DrawerTitle className="sr-only" />
            <DrawerDescription className="sr-only" />
            <div className="relative overflow-y-scroll">
              <DrawerClose
                className="absolute p-4 top-3 right-3"
                onClick={() => setIsOpen(false)}
              >
                <XCircle size={24} className="text-black" />
              </DrawerClose>
              <OfferModalContent offer_id={organization?.offer_id || ""} />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
