import { usePublishPostBloggerMutation } from "@shared/store/services/bloggerOffersService";
import { IOrderFeature } from "@shared/types/order";
import { ToastAction } from "@shared/ui/shadcn-ui/ui/toast";
import { useToast } from "@shared/ui/shadcn-ui/ui/use-toast";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shared/ui/shadcn-ui/ui/popover";
import { SendHorizonal } from "lucide-react";

export const SendLink: FC<IOrderFeature> = ({ order_id }) => {
  const [url, setUrl] = useState("");
  const [isUrlValid, setIsUrlValid] = useState(true);
  const { toast } = useToast();
  const [publishPostBlogger] = usePublishPostBloggerMutation();
  const { t } = useTranslation();

  // Функция для проверки валидности URL
  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleOnClick = () => {
    if (!url || !isValidUrl(url)) {
      setIsUrlValid(false);
      return;
    }

    setIsUrlValid(true);
    publishPostBlogger({ order_id, url })
      .unwrap()
      .then(() => {
        toast({
          variant: "success",
          title: t("toasts.offers_blogger.send_link.success"),
        });
      })
      .catch((error) => {
        toast({
          variant: "error",
          title: t("toasts.offers_blogger.send_link.error"),
          description: error,
          action: <ToastAction altText="Ok">Ok</ToastAction>,
        });
        console.error("error: ", error);
      });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <p className={styles.button}>
          {t(`offer_btn.send_link`)}
          <SendHorizonal />
        </p>
      </PopoverTrigger>
      <PopoverContent className="rounded-[10px] p-0 w-full h-full" align="end">
        <div className={styles.popover}>
          {!isUrlValid && (
            <p className={styles.error_input}>
              {t("offers_blogger.offer_status.active.invalid_url")}
            </p>
          )}
          <div className={styles.link}>
            <input
              className={`${styles.link__input} ${!isUrlValid ? styles.link__input_invalid : ""}`}
              placeholder={t("offers_blogger.offer_status.active.placeholder")}
              onChange={(e) => {
                setUrl(e.target.value);
                setIsUrlValid(true);
              }}
              value={url}
            />
            <p className={styles.link__send_icon} onClick={handleOnClick}>
              <SendHorizonal />
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
