import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Label,
  Input,
  Button,
} from "@shared/ui";

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
        className="sm:max-w-[425px] z-[100]"
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
            <Label htmlFor="linkText">{t("chat.format.text") || "Текст"}</Label>
            <Input
              id="linkText"
              placeholder={
                t("chat.format.text_placeholder") || "Введите текст..."
              }
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
            <Label htmlFor="linkUrl">{t("chat.format.link") || "Ссылка"}</Label>
            <Input
              id="linkUrl"
              placeholder={t("chat.format.enter_url") || "https://..."}
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
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            {t("actions.cancel") || "Отмена"}
          </Button>
          <Button onClick={onApply}>{t("actions.apply") || "Применить"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
