import { FC } from "react";
import { Copy } from "lucide-react";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { useToast } from "@shared/ui";

interface CopyTextBtnProps {
  text?: string;
}

export const CopyTextBtn: FC<CopyTextBtnProps> = ({ text }) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const copyText = () => {
    if (text) {
      navigator.clipboard.writeText(text).then(
        () => {
          toast({
            variant: "success",
            title: t("toasts.post.copy_text"),
          });
        },
        (err) => {
          console.error("Ошибка при копировании текста: ", err);
        },
      );
    }
  };

  return (
    <div>
      {text && (
        <div onClick={copyText} className={`${styles.download_btn} `}>
          <div className={styles.download_btn__title}>
            {t("copy_post_text")}
          </div>
          <span className={styles.download_btn__icon}>
            <Copy width={20} height={20} stroke="#2d2d2d" />
          </span>
        </div>
      )}
    </div>
  );
};
