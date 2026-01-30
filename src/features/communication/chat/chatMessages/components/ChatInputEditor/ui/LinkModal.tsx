import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  MyButton,
} from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface LinkModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  linkText: string;
  setLinkText: (text: string) => void;
  linkUrl: string;
  setLinkUrl: (url: string) => void;
  onApply: () => void;
}

export const LinkModal: FC<LinkModalProps> = ({
  isOpen,
  onOpenChange,
  linkText,
  setLinkText,
  linkUrl,
  setLinkUrl,
  onApply,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[425px] p-6 z-[100]"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          setTimeout(() => {
            const input = document.getElementById(
              linkText ? "linkUrl" : "linkText",
            ) as HTMLInputElement;
            input?.focus();
            input?.select();
          }, 100);
        }}
      >
        <DialogHeader>
          <DialogTitle>{t("chat.format.link")}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="linkText">{t("chat.format.text")}</Label>
            <Input
              id="linkText"
              placeholder={t("chat.format.text_placeholder")}
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onApply();
                }
              }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              disabled={false}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="linkUrl">{t("chat.format.link")}</Label>
            <Input
              id="linkUrl"
              placeholder={t("chat.format.url_placeholder")}
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onApply();
                }
              }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              disabled={false}
            />
          </div>
        </div>
        <DialogFooter className="grid grid-cols-2 gap-5">
          <MyButton
            buttons_type="button__white"
            onClick={() => onOpenChange(false)}
          >
            {t("chat.actions.cancel")}
          </MyButton>
          <MyButton className="bg-primary" onClick={onApply}>
            {t("chat.actions.apply")}
          </MyButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
