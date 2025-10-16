import { FC } from "react";
import { Copy } from "lucide-react";
import TurndownService from "turndown";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { useToast } from "@shared/ui";
import { isMarkdownText } from "@shared/utils";

interface CopyTextBtnProps {
  text?: string;
}

export const CopyTextBtn: FC<CopyTextBtnProps> = ({ text }) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const copyText = () => {
    if (text) {
      let textToCopy = text;

      // Если текст уже в Markdown формате, копируем как есть
      if (isMarkdownText(text)) {
        textToCopy = text;
      } else {
        // Если это HTML, конвертируем в Markdown
        const turndownService = new TurndownService({
          headingStyle: "atx", // Используем # для заголовков
          bulletListMarker: "*", // Используем * для списков
          codeBlockStyle: "fenced", // Используем ``` для блоков кода
          linkStyle: "inlined", // Используем [text](url) для ссылок
        });

        textToCopy = turndownService.turndown(text);
      }

      // Копируем текст в буфер обмена
      navigator.clipboard.writeText(textToCopy).then(
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
