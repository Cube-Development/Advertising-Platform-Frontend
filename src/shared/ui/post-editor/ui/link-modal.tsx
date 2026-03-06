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
import { FC, useState } from "react";
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
  const [error, setError] = useState<string | null>(null);

  const handleApply = () => {
    if (!linkUrl.startsWith("https://")) {
      setError(t("chat.format.url_placeholder"));
      return;
    }
    setError(null);
    onApply();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        onOpenChange(open);
        if (!open) setError(null);
      }}
    >
      <DialogContent
        className="sm:max-w-[425px] p-6 z-[100]"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          setTimeout(() => {
            const input = document.getElementById(
              linkText ? "templateLinkUrl" : "templateLinkText",
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
            <Label htmlFor="templateLinkText">{t("chat.format.text")}</Label>
            <Input
              id="templateLinkText"
              placeholder={t("chat.format.text_placeholder")}
              value={linkText}
              onChange={(e) => setLinkText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleApply();
                }
              }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="templateLinkUrl">{t("chat.format.link")}</Label>
            <Input
              id="templateLinkUrl"
              placeholder={t("chat.format.url_placeholder")}
              value={linkUrl}
              className={error ? "border-red-500" : ""}
              onChange={(e) => {
                setLinkUrl(e.target.value);
                if (error) setError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleApply();
                }
              }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>
        </div>
        <DialogFooter className="grid grid-cols-2 gap-5">
          <MyButton
            buttons_type="button__white"
            onClick={() => onOpenChange(false)}
          >
            {t("chat.actions.cancel")}
          </MyButton>
          <MyButton className="bg-primary" onClick={handleApply}>
            {t("chat.actions.apply")}
          </MyButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
