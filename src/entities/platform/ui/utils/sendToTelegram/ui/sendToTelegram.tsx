import { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TelegramIcon } from "@shared/assets";

export const SendToTelegram: FC<{ post_deeplink: string }> = ({
  post_deeplink,
}) => {
  const { t } = useTranslation();
  return (
    <Link
      to={post_deeplink}
      target="_blank"
      className="mt-2 ml-2.5 flex items-center justify-center gap-3 p-3 rounded-full bg-white/60 text-[#2F7ED3] [&>svg]:size-4 [&>svg]:scale-[1.5] hover:bg-white duration-500 transition-all"
    >
      <TelegramIcon />
      <p className="mobile-xl:text-xs text-[11px] font-semibold">
        {t("send_to_telegram")}
      </p>
    </Link>
  );
};
