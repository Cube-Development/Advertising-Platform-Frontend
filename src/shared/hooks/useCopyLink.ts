import { useToast } from "@shared/ui";
import { useTranslation } from "react-i18next";

export const useCopyLink = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const copyLink = (text: string | number = "", toastMessage?: string) => {
    navigator.clipboard.writeText(text.toString());
    toast({
      variant: "default",
      title: t(toastMessage || "copy.default"),
    });
  };
  return { copyLink };
};
